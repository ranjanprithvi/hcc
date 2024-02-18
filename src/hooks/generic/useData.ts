import { useEffect, useState } from "react";
import { CanceledError } from "../../services/api-client";
import { httpService, Entity } from "../../services/http-service";

function useData<T extends Entity>(path: string, query?: Object, deps?: any[]) {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(
        () => {
            setLoading(true);
            const dataService = httpService(path);
            const { request, cancel } = dataService.getAll<T>(query);

            request
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                    setError("");
                })
                .catch((err) => {
                    if (err instanceof CanceledError) return;
                    setError(err.message);
                    setLoading(false);
                })
                .finally(() => {
                    // console.log("Loader hidden");
                    // setLoading(false);
                });

            return () => cancel();
        },
        deps ? [...deps] : []
    );

    return { data, setData, error, setError, isLoading };
}

export default useData;
