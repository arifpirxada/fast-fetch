import { ClientConf } from "../types/core.types";
import FastFetch from "./fastFetch";

const createClient = (conf: ClientConf): FastFetch => {
    return new FastFetch(conf);
}

export { createClient };