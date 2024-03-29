import { Account } from "./../models/account";
import { Profile } from "./../models/profile";
import {
    TransferProgressEvent,
    getUrl,
    list,
    remove,
    uploadData,
} from "aws-amplify/storage";
import { httpService } from "../services/http-service";
import _ from "lodash";
import { fetchAuthSession } from "aws-amplify/auth";
import Amplify from "aws-amplify";

interface Entity {
    _id: string;
    profile: Profile | string;
    recordName?: string;
}

interface DataEntity {
    profile: string;
    files: FileList | "";
}

export const pushRecordToDb = async <T1, T2 extends Entity>(
    id: string,
    data: T1,
    endPoint: string
) => {
    let service = httpService(endPoint);

    // data = _.omitBy(data, (value) => !value) as T;

    let promise;
    if (id == "new") {
        promise = service.post<T1, T2>(data);
    } else {
        promise = service.patch<T1, T2>(data, id);
    }

    return promise;
};

export const uploadFilesToS3 = async (
    files: FileList | undefined,
    folder: string,
    handleProgress: (event: TransferProgressEvent) => void,
    identityId?: string
) => {
    if (!files || files.length == 0) return Promise.resolve();

    const promises = Array.from(files).map(
        (file) =>
            uploadData({
                key: folder + "/" + file.name,
                data: file,
                options: {
                    onProgress: handleProgress,
                    contentType: file.type,
                    accessLevel: "private",
                },
            }).result
    );
    return Promise.all(promises);
};

// export const handleUpload = <T extends DataEntity>(
//     id: string,
//     data: T,
//     endpoint: string,
//     toast: any,
//     handleProgress: (event: TransferProgressEvent) => void,
//     identityId?: string,
//     callBack?: () => void
// ) => {
//     pushRecordToDb(id, _.omit(data, "files"), endpoint)
//         .then((res) => {
//             toast({
//                 title: `${res.data.recordName || "Prescription"} saved`,
//                 status: "success",
//                 duration: 3000,
//                 position: "bottom-right",
//             });
//             if (data.files && data.files.length > 0) {
//                 const files = data.files;

//                 fetchAuthSession().then((session) => {
//                     if (session.identityId) {
//                         uploadFilesToS3(
//                             files,
//                             session.identityId.toString() +
//                                 "/" +
//                                 res.data.profile +
//                                 endpoint +
//                                 "/" +
//                                 res.data._id,
//                             handleProgress
//                         )
//                             .then((res) => {
//                                 toast({
//                                     title: "Files uploaded to storage",
//                                     status: "success",
//                                     duration: 3000,
//                                     position: "bottom-right",
//                                 });
//                                 setTimeout(() => {
//                                     callBack && callBack();
//                                 }, 1000);
//                             })
//                             .catch((error) => {
//                                 toast({
//                                     title: "Error while uploading files",
//                                     description: error.message,
//                                     status: "error",
//                                     duration: 5000,
//                                     isClosable: true,
//                                     position: "bottom-right",
//                                 });
//                             });
//                     }
//                 });
//             } else {
//                 setTimeout(() => {
//                     callBack && callBack();
//                 }, 1000);
//             }
//         })
//         .catch((error) => {
//             toast({
//                 title: "Error while creating record",
//                 description: error.message,
//                 status: "error",
//                 duration: 5000,
//                 isClosable: true,
//                 position: "bottom-right",
//             });
//         });
// };

export const handleUpload = async <T extends DataEntity>(
    id: string,
    data: T,
    endpoint: string,
    toast: any,
    handleProgress: (event: TransferProgressEvent) => void,
    identityId?: string,
    callBack?: () => void
) => {
    const res = await pushRecordToDb(id, _.omit(data, "files"), endpoint);
    toast({
        title: `${res.data.recordName || "Prescription"} saved`,
        status: "success",
        duration: 3000,
        position: "bottom-right",
    });
    if (data.files && data.files.length > 0) {
        const files = data.files;

        if (!identityId) identityId = (await fetchAuthSession()).identityId;

        if (identityId) {
            await uploadFilesToS3(
                files,
                identityId.toString() +
                    "/" +
                    res.data.profile +
                    endpoint +
                    "/" +
                    res.data._id,
                handleProgress
            );
            toast({
                title: "Files uploaded to storage",
                status: "success",
                duration: 3000,
                position: "bottom-right",
            });
            setTimeout(() => {
                callBack && callBack();
            }, 1000);
        }
    } else {
        setTimeout(() => {
            callBack && callBack();
        }, 1000);
    }
};

//Download
export const handleViewRecord = async (folder: string) => {
    const prefix = (await fetchAuthSession()).identityId + folder;
    const files = await list({
        prefix: prefix,
        options: { accessLevel: "private" },
    });

    if (files.items.length == 0) return;
    files.items.forEach(async (file) => {
        const getUrlResult = await getUrl({
            key: file.key,
            options: {
                expiresIn: 60,
                validateObjectExistence: true,
                accessLevel: "private",
            },
        });

        window.open(getUrlResult.url, "_blank");
    });
};

export const handleViewFile = async (key: string) => {
    const getUrlResult = await getUrl({
        key: key,
        options: {
            expiresIn: 300,
            validateObjectExistence: true,
            accessLevel: "private",
        },
    });

    window.open(getUrlResult.url, "_blank");
};

//Delete
export const deleteRecordFromDb = <T extends Entity>(
    record: T,
    serviceEndpoint: string
) => {
    let service = httpService(serviceEndpoint);
    return service.delete(record._id);
};

export const deleteFolderFromS3 = async (folderPath: string) => {
    const files = await list({
        prefix: folderPath,
        options: { accessLevel: "private" },
    });

    if (files.items.length == 0) {
        return Promise.resolve(false);
    }
    const promises = files.items.map((file) => remove({ key: file.key }));

    return Promise.all(promises);
};

export const deleteFileFromS3 = async (key: string) => {
    return remove({ key: key });
};

export const handleDelete = <T extends Entity>(
    record: T,
    endPoint: string,
    identityId: string,
    toast: any,
    callBack?: () => void
) => {
    deleteFolderFromS3(
        identityId + "/" + record.profile + endPoint + "/" + record._id + "/"
    )
        .then((res) => {
            if (res != false) {
                toast({
                    title: `${
                        record.recordName || "Prescription"
                    } deleted from storage`,
                    status: "success",
                    duration: 3000,
                    position: "bottom-right",
                });
            }
            deleteRecordFromDb(record, endPoint)
                .then((res) => {
                    toast({
                        title: `${
                            record.recordName || "Prescription"
                        } deleted from database`,
                        status: "success",
                        duration: 3000,
                        position: "bottom-right",
                    });
                    setTimeout(() => {
                        callBack && callBack();
                    }, 1000);
                })
                .catch((error) => {
                    toast({
                        title: "Error while deleting record",
                        description: error.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom-right",
                    });
                });
        })
        .catch((error) => {
            toast({
                title: "Error while deleting files",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
        });
};
