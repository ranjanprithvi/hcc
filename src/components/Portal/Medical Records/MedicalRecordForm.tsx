import { Box, GridItem, useToast } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _, { create, get } from "lodash";
import Form, { Field } from "../../common/Form";
import useMedicalRecord from "../../../hooks/useMedicalRecord";
import { useNavigate, useParams } from "react-router-dom";
import { doctorId } from "../../../App";
import { MedicalRecord } from "../../../models/medicalRecord";
import moment from "moment";
import { uploadData } from "aws-amplify/storage";
import { error } from "console";
import { httpService } from "../../../services/http-service";
import { Profile } from "../../../models/profile";
import {
    createRecordinDb,
    handleUpload,
} from "../../../utilities/record-manager-service";

const schema = z.object({
    files: z.instanceof(FileList),
    profileId: z.string(),
    doctorId: z.string(),
    dateOnDocument: z.string(),
    recordName: z.string(),
    recordType: z.string(),
});

type MedicalRecordData = z.infer<typeof schema>;

const MedicalRecordForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const resolver = zodResolver(schema);
    const { id, profileId } = useParams();
    if (!id) return null;

    const { medicalRecord, error } = useMedicalRecord(id);

    if (error) {
        return <div>{error}</div>;
    }

    const resetObject = {
        profileId: (medicalRecord?.profile as Profile)?._id || profileId || "",
        doctorId: doctorId,
        dateOnDocument: moment(medicalRecord?.dateOnDocument).format(
            "YYYY-MM-DD"
        ),
        recordName: medicalRecord?.folderPath?.split("/").pop() || "",
        recordType: medicalRecord?.recordType,
        files: {} as FileList,
    };

    const fields: Field<MedicalRecordData>[] = [
        {
            type: "textInput",
            label: "Date On Document",
            name: "dateOnDocument",
            inputType: "date",
        },
        {
            type: "textInput",
            label: "Record Name",
            name: "recordName",
        },
        {
            type: "textInput",
            label: "Record Type",
            name: "recordType",
        },
    ];

    if (id == "new") {
        fields.push({
            type: "textInput",
            label: "Files",
            name: "files",
            inputType: "file",
        });
    }

    const onSubmit = (data: MedicalRecordData) => {
        if (id == "new") {
            handleUpload<MedicalRecordData, MedicalRecord>(
                id,
                data,
                "MedicalRecords",
                "/medicalRecords",
                `/portal/profileOverview/${profileId}`,
                toast,
                navigate
            );
        } else {
            console.log(data);
        }
    };

    return (
        <GridItem colSpan={2} marginX={5} marginY="auto">
            <Box
                marginX={"auto"}
                background={"white"}
                borderRadius={"5px"}
                boxShadow={"0px 0px 10px #b3b3b3"}
                padding={10}
                maxWidth={"600px"}
            >
                <Form<MedicalRecordData>
                    resolver={resolver}
                    fields={fields}
                    resetObject={resetObject}
                    heading={"Upload Record"}
                    onSubmit={onSubmit}
                />
            </Box>
        </GridItem>
    );
};

export default MedicalRecordForm;
