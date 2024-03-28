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
                    options: { accessLevel: accessLevel || "guest" },
                });
                // console.log((medicalRecord?.profile as Profile)?._id);
                setFiles(result.items);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFiles();
    }, deps || []);

    return files;
}
