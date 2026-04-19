import { ClientConf, Options, RequestMethods } from "../types/core.types";

class FastFetch {
    private conf: ClientConf;

    constructor(conf: ClientConf) {
        this.conf = conf;
    }

    async handleRequest<T = unknown>(
        method: RequestMethods, url: string, options?: Options, body?: Record<string, unknown>
    ): Promise<{ data: T | null; status: number; error: string | null }> {
        // Form apiUrl
        const query = this.getQueryStr(options?.params);
        const baseUrl = options?.baseUrl ? options.baseUrl : this.conf.baseUrl;
        const apiUrl = baseUrl + url + query;

        // Get Headers
        const headers: Record<string, string> = {
            ...(body ? { "Content-Type": "application/json" } : {}),
            ...(this.conf.headers ?? {}),
            ...(options?.headers ?? {})
        };

        // Timeout

        const controller = new AbortController();
        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        if (!options?.signal && (this.conf.timeout || options?.timeout)) {
            timeoutId = setTimeout(() => {
                controller.abort();
            }, options?.timeout ? options.timeout : this.conf.timeout);
        }

        // Build fetch options
        const fetchOptions: RequestInit = { method, headers, signal: options?.signal ?? controller.signal }
        if (body) fetchOptions.body = JSON.stringify(body);

        try {
            const res = await fetch(apiUrl, fetchOptions);
            timeoutId && clearTimeout(timeoutId);

            if (!res.ok) {
                if (controller.signal.aborted) {
                    return { data: null, status: 0, error: 'Request timed out' };
                }
                return {
                    data: null,
                    status: res.status,
                    error: await res.text()
                };
            }

            const data = await res.json() as T;

            return { data, status: res.status, error: null };
        } catch (e) {
            timeoutId && clearTimeout(timeoutId);

            if (e instanceof Error && e.name === 'AbortError') {
                return { data: null, status: 0, error: 'Request timed out' }
            }

            return { data: null, status: 0, error: e instanceof Error ? e.message : String(e) };
        }
    }

    async get<T = unknown>(url: string, options?: Options) {
        return this.handleRequest<T>("GET", url, options);
    }

    async post<T = unknown>(url: string, body: Record<string, unknown>, options?: Options) {
        return this.handleRequest<T>("POST", url, options, body);
    }
    async put<T = unknown>(url: string, body: Record<string, unknown>, options?: Options) {
        return this.handleRequest<T>("PUT", url, options, body);
    }
    async patch<T = unknown>(url: string, body: Record<string, unknown>, options?: Options) {
        return this.handleRequest<T>("PATCH", url, options, body);
    }
    async delete<T = unknown>(url: string, options?: Options) {
        return this.handleRequest<T>("DELETE", url, options);
    }

    // Helpers

    getQueryStr = (params: Record<string, string> | undefined): string => {
        if (!params) return "";

        const entries = Object.entries(params);
        if (entries.length === 0) return "";

        const query = entries
            .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join("&");

        return `?${query}`;
    }
};

export { FastFetch as default };