/// <reference types="aws-sdk" />
import AWS from "aws-sdk";

export const uploadFile = async (file: any) => {
    const S3_BUCKET = "ranjanprabhu.hcc";
    const REGION = "ap-south-1";

    AWS.config.update({
        accessKeyId: "AKIAS4MZZMXXXM6M777L",
        secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    });

    const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
    };

    var upload = s3
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
            console.log("Uploading " + (evt.loaded * 100) / evt.total + "%");
        })
        .promise();

    await upload
        .then(() => {
            alert("File uploaded successfully.");
        })
        .catch((err) => {
            alert("File upload failed.");
            console.log(err);
        });
};
