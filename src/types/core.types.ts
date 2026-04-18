interface Options {
    headers?: object;
    params?: object;
    timeout?: number;
    baseUrl?: string 
}

interface ClientConf {
    baseUrl: string;
    headers?: object;
    timeout?: number;
}

export { Options, ClientConf };