import { ClientConf, Options } from "../types/core.types";

class FastFetch {
    private conf: ClientConf;

    constructor(conf: ClientConf) {
        this.conf = conf;
    }

    async get(url: string, options: Options) { }
    async post(url: string, body: any, options: Options) { }
    async put(url: string, body: any, options: Options) { }
    async patch(url: string, body: any, options: Options) { }
    async delete(url: string, options: Options) { }
};

export { FastFetch as default };