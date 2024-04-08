import {
    Box,
    GridItem,
    HStack,
    Text,
    Progress,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import GridForm, { Field } from "./PrescriptionGridForm";
import usePrescription from "../../../hooks/usePrescription";
import { useNavigate, useParams } from "react-router-dom";
import { doctorId } from "../../../App";
import { Prescription } from "../../../models/prescription";
import moment from "moment";
import { TransferProgressEvent, list } from "aws-amplify/storage";
import { Profile } from "../../../models/profile";
import {
    handleUpload,
    uploadFilesToS3,
} from "../../../utilities/record-manager-service";
import Modal from "../../common/Modal";
import { useContext, useEffect, useState } from "react";
import FilesList from "../FilesList";
import useS3Files from "../../../hooks/useS3Files";
import { Account } from "../../../models/account";
import { AccountContext } from "../../../contexts/profileContext";
import { getProfileId } from "../../../utilities/helper-service";

const schema = z.object({
    files: z.union([z.instanceof(FileList), z.literal("")]),
    existingFiles: z.array(z.any()).optional(),
    profile: z.string(),
    doctor: z.string(),
    dateOnDocument: z.string(),
    content: z.string(),
    medications: z.array(
        z.object({
            name: z.string(),
            dosage: z.string().optional(),
            interval: z.string().optional(),
            quantity: z.string().optional(),
            instructions: z.string().optional(),
        })
    ),
});

type PrescriptionData = z.infer<typeof schema>;

const PrescriptionForm = () => {
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
    const { id } = useParams();
    if (!id) return null;

    const { identityId } = useContext(AccountContext);

    const { prescription, error } = usePrescription(id);

    const existingFiles = useS3Files(
        identityId + "/" + getProfileId() + "/Prescriptions/" + id,
        [prescription]
    );

    if (error) {
        return <div>{error}</div>;
    }

    const resetObject = {
        profile: getProfileId(),
        doctor: doctorId,
        dateOnDocument: moment(prescription?.dateOnDocument).format(
            "YYYY-MM-DD"
        ),
        files: "" as "",
        content: prescription?.content || "",
        medications: prescription?.medications || [],
    };

    const fields: Field<PrescriptionData>[] = [
        {
            type: "textInput",
            label: "Date of Prescription",
            name: "dateOnDocument",
            inputType: "date",
        },
        {
            type: "textArea",
            label: "Content",
            name: "content",
            minHeight: "200px",
        },
        // {
        //     type: "textInput",
        //     label: "Medications",
        //     name: "medications",
        //     inputType: "text",
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
        label: "Add Files",
        name: "files",
        inputType: "file",
        acceptFileTypes: "image/*",
    });

    const onSubmit = (data: PrescriptionData) => {
        if (data.files && data.files.length > 0) onOpen();

        handleUpload(
            id,
            _.omit(data, ["existingFiles"]),
            "/prescriptions",
            toast,
            handleProgress,
            identityId,
            () => {
                navigate(-1);
            }
        );
    };
    // const onSubmit = (data: PrescriptionData) => {
    //     if (data.files && data.files.length > 0) onOpen();

    //     if (id == "new") {
    //         uploadFilesToS3(
    //             data.files,
    //             data.profileId + "/Prescriptions/" + data.recordName,
    //             handleProgress
    //         );
    //     } else {
    //         console.log(data);
    //     }
    // };

    // const onSubmit = (data: PrescriptionData) => {
    //     console.log(data);
    // };

    return (
        <GridItem colSpan={2} marginY="auto">
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
                background={"white"}
                borderRadius={"5px"}
                boxShadow={"0px 0px 10px #b3b3b3"}
            >
                <GridForm<PrescriptionData>
                    resolver={resolver}
                    fields={fields}
                    resetObject={resetObject}
                    resetDependencies={[prescription]}
                    heading={"Upload"}
                    onSubmit={onSubmit}
                />
            </Box>
        </GridItem>
    );
};

export default PrescriptionForm;
