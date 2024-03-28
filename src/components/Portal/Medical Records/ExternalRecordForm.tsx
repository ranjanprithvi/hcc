import {
    Box,
    GridItem,
    HStack,
    Progress,
    useDisclosure,
    useToast,
    Text,
    List,
    ListItem,
    Tooltip,
    Flex,
    UnorderedList,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import Form, { Field } from "../../common/Form";
import useExternalRecord from "../../../hooks/useExternalRecord";
import { useNavigate, useParams } from "react-router-dom";
import { ExternalRecord } from "../../../models/externalRecord";
import moment from "moment";
import { TransferProgressEvent, list } from "aws-amplify/storage";
import { Profile } from "../../../models/profile";
import { getCurrentProfileId } from "../../../utilities/helper-service";
import useSpecializations from "../../../hooks/useSpecializations";
import {
    handleUpload,
    uploadFilesToS3,
} from "../../../utilities/record-manager-service";
import Modal from "../../common/Modal";
import { useEffect, useState } from "react";
import TruncatedText from "../../common/TruncatedText";
import FilesList from "../FilesList";
import useS3Files from "../../../hooks/useS3Files";
import { getCurrentUser } from "aws-amplify/auth";

const schema = z.object({
    files: z.union([z.instanceof(FileList), z.literal("")]),
    existingFiles: z.array(z.any()).optional(),
    profile: z.string(),
    doctor: z.string(),
    specialization: z.string(),
    hospital: z.string(),
    dateOnDocument: z.string(),
    recordName: z.string(),
    recordType: z.string(),
});

type ExternalRecordData = z.infer<typeof schema>;

const ExternalRecordForm = () => {
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

    const { externalRecord, error } = useExternalRecord(id);

    const existingFiles = useS3Files(
        getCurrentProfileId() + "/externalRecords/" + id + "/",
        [externalRecord],
        "private"
    );

    if (error) {
        return <div>{error}</div>;
    }

    const resetObject = {
        profile:
            (externalRecord?.profile as Profile)?._id ||
            getCurrentProfileId() ||
            "",
        doctor: externalRecord.doctor,
        specialization: externalRecord.specialization?._id,
        hospital: externalRecord.hospital,
        dateOnDocument: moment(externalRecord?.dateOnDocument).format(
            "YYYY-MM-DD"
        ),
        recordName: externalRecord?.recordName,
        recordType: externalRecord?.recordType,
        files: "" as "",
    };

    const fields: Field<ExternalRecordData>[] = [
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
        {
            type: "textInput",
            label: "Doctor",
            name: "doctor",
        },
        {
            type: "select",
            label: "Specialization",
            name: "specialization",
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
        acceptFileTypes:
            "image/*,application/pdf,video/mp4,video/x-m4v,video/*",
    });

    const onSubmit = (data: ExternalRecordData) => {
        if (data.files && data.files.length > 0) onOpen();
        handleUpload(
            id,
            _.omit(data, ["existingFiles"]),
            "/externalRecords",
            toast,
            handleProgress,
            () => {
                navigate(-1);
            }
        );
    };

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
                <Form<ExternalRecordData>
                    resolver={resolver}
                    fields={fields}
                    resetObject={resetObject}
                    resetDependencies={[externalRecord]}
                    heading={"Upload Record"}
                    onSubmit={onSubmit}
                />
            </Box>
        </GridItem>
    );
};

export default ExternalRecordForm;
