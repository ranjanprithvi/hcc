import { useEffect, useState } from "react";
import { CanceledError } from "../../services/api-client";
import { httpService, Entity } from "../../services/http-service";

function useDataItem<T extends Entity>(
    path: string,
    id: string,
    query?: Object,
    deps?: any[]
) {
    const [data, setData] = useState<T>({} as T);
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        const dataService = httpService(path);
        const { request, cancel } =
            id == "new"
                ? {
                      request: Promise.resolve({ data: {} as T }),
                      cancel: () => {},
                  }
                : dataService.get<T>(id, query);

        request
            .then((res) => {
                setLoading(false);
                setError("");
                setData(res.data);
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
    }, [...(deps as [])]);

    return { data, setData, error, setError, isLoading };
}

export default useDataItem;
