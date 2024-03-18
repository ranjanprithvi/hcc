import {
    Box,
    GridItem,
    HStack,
    Progress,
    useDisclosure,
    useToast,
    Text,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import Form, { Field } from "../../common/Form";
import useExternalPrescription from "../../../hooks/useExternalPrescription";
import { useNavigate, useParams } from "react-router-dom";
import { ExternalPrescription } from "../../../models/externalPrescription";
import moment from "moment";
import { TransferProgressEvent, list } from "aws-amplify/storage";
import { Profile } from "../../../models/profile";
import { getCurrentProfileId } from "../../../utilities/helper-service";
import useSpecializations from "../../../hooks/useSpecializations";
import {
    handleUpload,
    uploadFilesToS3,
} from "../../../utilities/record-manager-service";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import FilesList from "../FilesList";

const schema = z.object({
    files: z.union([z.instanceof(FileList), z.literal("")]),
    existingFiles: z.array(z.any()).optional(),
    profile: z.string(),
    doctor: z.string(),
    specializationId: z.string(),
    hospital: z.string(),
    dateOnDocument: z.string(),
});

type ExternalPrescriptionData = z.infer<typeof schema>;

const ExternalPrescriptionForm = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const [progress, setProgress] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleProgress = (progress: TransferProgressEvent) => {
        setProgress(
            (progress.transferredBytes / (progress.totalBytes || 1)) * 100
        );
    };

    const resolver = zodResolver(schema);
    const { id, profileId } = useParams();
    if (!id) return null;
    const { specializations } = useSpecializations();

    const { externalPrescription, error } = useExternalPrescription(id);

    if (error) {
        return <div>{error}</div>;
    }

    const [existingFiles, setExistingFiles] = useState<any[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const result = await list({
                    prefix:
                        getCurrentProfileId() +
                        "/externalPrescriptions/" +
                        id +
                        "/",
                });
                // console.log((medicalRecord?.profile as Profile)?._id);
                setExistingFiles(result.items);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFiles();
    }, [externalPrescription]);

    const resetObject = {
        profile:
            (externalPrescription?.profile as Profile)?._id ||
            getCurrentProfileId() ||
            "",
        doctor: externalPrescription.doctor,
        specializationId: externalPrescription.specialization?._id,
        hospital: externalPrescription.hospital,
        dateOnDocument: moment(externalPrescription?.dateOnDocument).format(
            "YYYY-MM-DD"
        ),
        files: "" as "",
    };

    const fields: Field<ExternalPrescriptionData>[] = [
        {
            type: "textInput",
            label: "Doctor",
            name: "doctor",
        },
        {
            type: "textInput",
            label: "Hospital",
            name: "hospital",
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
            label: "Date On Document",
            name: "dateOnDocument",
            inputType: "date",
        },
        // {
        //     type: "textInput",
        //     label: "Prescription Name",
        //     name: "recordName",
        // },
    ];

    if (id != "new") {
        fields.push({
            render: () => <FilesList files={existingFiles}></FilesList>,
            label: "Existing Files",
            name: "existingFiles",
        });
    }

    fields.push({
        type: "textInput",
        label: "Add Files",
        name: "files",
        inputType: "file",
        acceptFileTypes: "image/*",
    });

    const onSubmit = (data: ExternalPrescriptionData) => {
        if (data.files && data.files.length > 0) onOpen();

        handleUpload(
            id,
            _.omit(data, ["existingFiles"]),
            "/externalPrescriptions",
            toast,
            handleProgress,
            () => {
                navigate(-1);
            }
        );
    };
    // const onSubmit = (data: ExternalPrescriptionData) => {
    //     onOpen();
    //     if (id == "new") {
    //         uploadFilesToS3<ExternalPrescriptionData, ExternalPrescription>(
    //             id,
    //             data,
    //             "ExternalPrescriptions",
    //             "/externalPrescriptions",
    //             handleProgress,
    //             "/portal/prescriptions",
    //             toast,
    //             navigate
    //         );
    //     } else {
    //         console.log(data);
    //     }
    // };

    return (
        <GridItem colSpan={2} marginX={5} marginY="auto">
            <Modal
                header="Uploading Record..."
                body=""
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <HStack width={"100%"}>
                        <Progress
                            width={"100%"}
                            value={progress}
                            hasStripe
                            colorScheme="pink"
                        />
                        <Text>{Math.floor(progress) + "%"}</Text>
                    </HStack>
                )}
            />
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
                    resetDependencies={[externalPrescription]}
                    heading={
                        id == "new"
                            ? "Upload Prescription"
                            : "Edit Prescription"
                    }
                    onSubmit={onSubmit}
                />
            </Box>
        </GridItem>
    );
};

export default ExternalPrescriptionForm;