import { list } from "aws-amplify/storage";
import { useEffect, useState } from "react";

export default function useS3Files(
    prefix: string,
    deps?: any[],
    accessLevel?: "guest" | "protected" | "private"
) {
    const [files, setFiles] = useState<any[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const result = await list({
                    prefix: prefix,
                    options: { accessLevel: accessLevel || "private" },
                });
                console.log(prefix);
                console.log(result);
                setFiles(result.items);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFiles();
    }, deps || []);

    return files;
}
