import { MedicalRecord } from "../models/medicalRecord";
import { getUrl, remove, uploadData } from "aws-amplify/storage";
import { ExternalRecord } from "../models/externalRecord";
import { File } from "../models/file";
import { Prescription } from "../models/prescription";
import { ExternalPrescription } from "../models/externalPrescription";
import { httpService } from "../services/http-service";
import Amplify from "aws-sdk/clients/amplify";

interface Entity {
    _id: string;
    folderPath: string;
    files: string[] | File[];
}

interface DataEntity {
    profileId: string;
    recordName: string;
    files: FileList;
}

export const handleUpload = async <T extends DataEntity>(
    id: string,
    data: T,
    folder: string,
    endPoint: string,
    navigateTo: string,
    toast: any,
    navigate: any
) => {
    // console.log("data", data);
    const promises = Array.from(data.files).map(
        (file) =>
            uploadData({
                key: `hcc/${data.profileId}/${folder}/${data.recordName}/${file.name}`,
                data: file,
                options: {
                    onProgress: (progress) =>
                        console.log(
                            `Uploaded: ${progress.transferredBytes}/${progress.totalBytes}`
                        ),
                },
            }).result
    );
    Promise.all(promises)
        .then((res) => {
            createRecordinDb(id, data, endPoint, navigateTo, toast, navigate);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const createRecordinDb = <T1, T2>(
    id: string,
    data: T1,
    endPoint: string,
    navigateTo: string,
    toast: any,
    navigate: any
) => {
    let service = httpService(endPoint);

    // data = _.omitBy(data, (value) => !value) as T;

    let promise;
    if (id == "new") {
        promise = service.post<T1, T2>(data);
    } else {
        promise = service.patch<T1, T2>(data, id);
    }

    promise
        .then((res) => {
            navigate(navigateTo, {
                replace: true,
            });
        })
        .catch((err) => {
            toast({
                title: "Error",
                description: err.response?.data?.toString(),
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        });
};

export const handleDownload = async <T extends Entity>(record: T) => {
    // console.log("record", record);
    record.files.forEach(async (file) => {
        const getUrlResult = await getUrl({
            key: record.folderPath + "/" + (file as File).name,
            options: { expiresIn: 60, validateObjectExistence: true },
        });

        window.open(getUrlResult.url, "_blank");
    });
};

const deleteRecordFromDb = <T extends Entity>(
    record: T,
    toast: any,
    serviceEndpoint: string
) => {
    let service = httpService(serviceEndpoint);

    service
        .delete(record._id)
        .then((res) => {
            alert(`${record.folderPath.split("/").pop()} deleted successfully`);
            window.location.reload();
        })
        .catch((err) => {
            toast({
                title: "Error",
                description: err.response?.data?.toString(),
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        });
};

export const handleDelete = async <T extends Entity>(
    record: T,
    toast: any,
    serviceEndpoint: string
) => {
    const key = record.folderPath + "/" + (record.files[0] as File).name;
    await remove({ key: key })
        .then(() => deleteRecordFromDb(record, toast, serviceEndpoint))
        .catch(() => alert("Something went wrong"));
};