import { Box, GridItem, useToast } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import Form, { Field } from "../../common/Form";
import useExternalPrescription from "../../../hooks/useExternalPrescription";
import { useNavigate, useParams } from "react-router-dom";
import { doctorId } from "../../../App";
import { ExternalPrescription } from "../../../models/externalPrescription";
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
});

type ExternalPrescriptionData = z.infer<typeof schema>;

const ExternalPrescriptionForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const resolver = zodResolver(schema);
    const { id, profileId } = useParams();
    if (!id) return null;
    const { specializations } = useSpecializations();

    const { externalPrescription, error } = useExternalPrescription(id);

    if (error) {
        return <div>{error}</div>;
    }

    const resetObject = {
        profileId:
            (externalPrescription?.profile as Profile)?._id ||
            getCurrentProfileId() ||
            "",
        doctor: externalPrescription.doctor,
        specializationId: externalPrescription.specialization?._id,
        hospital: externalPrescription.hospital,
        dateOnDocument: moment(externalPrescription?.dateOnDocument).format(
            "YYYY-MM-DD"
        ),
        recordName: externalPrescription?.folderPath?.split("/").pop() || "",
        files: {} as FileList,
    };

    const fields: Field<ExternalPrescriptionData>[] = [
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
            label: "Prescription Name",
            name: "recordName",
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

    const onSubmit = (data: ExternalPrescriptionData) => {
        if (id == "new") {
            handleUpload<ExternalPrescriptionData, ExternalPrescription>(
                id,
                data,
                "ExternalPrescriptions",
                "/externalPrescriptions",
                "/portal/prescriptions",
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
                <Form<ExternalPrescriptionData>
                    resolver={resolver}
                    fields={fields}
                    resetObject={resetObject}
                    heading={"Upload Prescription"}
                    onSubmit={onSubmit}
                />
            </Box>
        </GridItem>
    );
};

export default ExternalPrescriptionForm;
