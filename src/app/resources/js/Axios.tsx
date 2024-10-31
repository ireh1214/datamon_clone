'use client';
import axios from "axios";

export default async function restApi(method: string, path: string, params: any) {
    if (method === 'get') {
        return await get(path, params)
    } else if (method === 'post') {
        return await post(path, params)
    } else {
        throw new Error(`Unsupported method: ${method}`);
    }
}

async function get(path: string, params: any) {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_MAIN_API_BASE_URL}${path}`, { params,
            withCredentials: true,
            headers: {
                URL: window.location.href,
                Domain: window.location.origin,
                Path: window.location.pathname,
            }, });
    } catch (error) {
       // @ts-ignore
        return error.response;
    }
}

async function post(path: string, params: any) {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_MAIN_API_BASE_URL}${path}`, params,{
            withCredentials: true,
            headers: {
                URL: window.location.href,
                Domain: window.location.origin,
                Path: window.location.pathname,
            },
        });
    } catch (error) {
        // @ts-ignore
        return error.response;
    }
}