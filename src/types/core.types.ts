interface Options {
    headers?: Record<string, string>;
    params?: Record<string, string>;
    timeout?: number;
    baseUrl?: string 
}

interface ClientConf {
    baseUrl: string;
    headers?: Record<string, string>;
    timeout?: number;
}

type RequestMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export { Options, ClientConf, RequestMethods };