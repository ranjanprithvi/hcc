import { Box, GridItem, useToast } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import Form, { Field } from "../../common/Form";
import useExternalRecord from "../../../hooks/useExternalRecord";
import { useNavigate, useParams } from "react-router-dom";
import { doctorId } from "../../../App";
import { ExternalRecord } from "../../../models/externalRecord";
import moment from "moment";
import { uploadData } from "aws-amplify/storage";
import { httpService } from "../../../services/http-service";
import { Profile } from "../../../models/profile";
import { getCurrentProfileId } from "../../../utilities/helper-service";
import useSpecializations from "../../../hooks/useSpecializations";
import {
    createRecordinDb,
    handleUpload,
} from "../../../utilities/record-manager-service";

const schema = z.object({
    files: z.instanceof(FileList),
    profileId: z.string(),
    doctor: z.string(),
    specializationId: z.string(),
    hospital: z.string(),
    dateOnDocument: z.string(),
    recordName: z.string(),
    recordType: z.string(),
});

type ExternalRecordData = z.infer<typeof schema>;

const ExternalRecordForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const resolver = zodResolver(schema);
    const { id, profileId } = useParams();
    if (!id) return null;
    const { specializations } = useSpecializations();

    const { externalRecord, error } = useExternalRecord(id);

    if (error) {
        return <div>{error}</div>;
    }

    const resetObject = {
        profileId:
            (externalRecord?.profile as Profile)?._id ||
            getCurrentProfileId() ||
            "",
        doctor: externalRecord.doctor,
        specializationId: externalRecord.specialization?._id,
        hospital: externalRecord.hospital,
        dateOnDocument: moment(externalRecord?.dateOnDocument).format(
            "YYYY-MM-DD"
        ),
        recordName: externalRecord?.folderPath?.split("/").pop() || "",
        recordType: externalRecord?.recordType,
        files: {} as FileList,
    };

    const fields: Field<ExternalRecordData>[] = [
        {
            type: "textInput",
            label: "Doctor",
            name: "doctor",
        },
        {
            type: "select",
            label: "Specialization",
            name: "specializationId",
            placeholder: "--Select Specialization--",
            options: specializations.map((s) => ({
                label: s.name,
                value: s._id,
            })),
        },
        {
            type: "textInput",
            label: "Hospital",
            name: "hospital",
        },
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

    const onSubmit = (data: ExternalRecordData) => {
        if (id == "new") {
            handleUpload<ExternalRecordData, ExternalRecord>(
                id,
                data,
                "ExternalRecords",
                "/externalRecords",
                "/portal/records",
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
                padding={10}
                maxWidth={"600px"}
                background={"white"}
                borderRadius={"5px"}
                boxShadow={"0px 0px 10px #b3b3b3"}
            >
                <Form<ExternalRecordData>
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

export default ExternalRecordForm;
