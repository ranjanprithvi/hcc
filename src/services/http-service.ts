import apiClient from "./api-client";

export interface Entity {
    _id: string;
    [key: string]: any | undefined;
}

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T extends Entity>(query?: Object) {
        const controller = new AbortController();
        return {
            request: apiClient.get<T[]>(this.endpoint, {
                signal: controller.signal,
                params: query,
            }),
            cancel: () => controller.abort(),
        };
    }

    get<T extends Entity>(id: string, query?: Object) {
        const controller = new AbortController();
        return {
            request: apiClient.get<T>(`${this.endpoint}/${id}`, {
                signal: controller.signal,
                params: query,
            }),
            cancel: () => controller.abort(),
        };
    }

    delete(id: string) {
        return apiClient.delete(`${this.endpoint}/${id}`);
    }

    post<T1, T2>(entity: T1) {
        return apiClient.post<T2>(this.endpoint, entity);
    }

    patch<T1, T2>(entity: T1, id: string) {
        return apiClient.patch<T2>(`${this.endpoint}/${id}`, entity);
    }
}

export const httpService = function (endpoint: string) {
    return new HttpService(endpoint);
};
