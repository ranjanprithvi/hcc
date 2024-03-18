import { getUrl, list } from "aws-amplify/storage";
import { useEffect, useState } from "react";

function useURLs(path: string) {
    const [urls, setURLs] = useState<URL[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        list({ prefix: path })
            .then((files) => {
                Promise.all(
                    files.items.map((file) =>
                        getUrl({
                            key: file.key,
                            options: {
                                expiresIn: 600,
                                validateObjectExistence: true,
                            },
                        })
                    )
                ).then((urls) => setURLs(urls.map((o) => o.url)));

                setTimeout(() => {
                    setLoading(false);
                }, 500);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

        // const dataService = httpService(path);
        // const { request, cancel } =
        //     id == "new"
        //         ? {
        //               request: Promise.resolve({ data: {} as T }),
        //               cancel: () => {},
        //           }
        //         : dataService.get<T>(id, query);

        // request
        //     .then((res) => {
        //         setLoading(false);
        //         setError("");
        //         setURLs(res.data);
        //     })
        //     .catch((err) => {
        //         if (err instanceof CanceledError) return;
        //         setError(err.message);
        //         setLoading(false);
        //     })
        //     .finally(() => {
        //         // console.log("Loader hidden");
        //         // setLoading(false);
        //     });

        // return () => cancel();
    }, []);

    return { urls, setURLs, error, setError, isLoading };
}

export default useURLs;
