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
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import Form, { Field } from "../../common/Form";
import useMedicalRecord from "../../../hooks/useMedicalRecord";
import { useNavigate, useParams } from "react-router-dom";
import { doctorId } from "../../../App";
import moment from "moment";
import { TransferProgressEvent, list } from "aws-amplify/storage";
import { Profile } from "../../../models/profile";
import { handleUpload } from "../../../utilities/record-manager-service";
import Modal from "../../common/Modal";
import { useEffect, useState } from "react";
import FilesList from "../FilesList";

const schema = z.object({
    files: z.union([z.instanceof(FileList), z.literal("")]),
    existingFiles: z.array(z.any()).optional(),
    profile: z.string(),
    doctor: z.string(),
    dateOnDocument: z.string(),
    recordName: z.string(),
    recordType: z.string(),
});

type MedicalRecordData = z.infer<typeof schema>;

const MedicalRecordForm = () => {
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

    const { medicalRecord, error } = useMedicalRecord(id);

    if (error) {
        return <div>{error}</div>;
    }

    const [existingFiles, setExistingFiles] = useState<any[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const result = await list({
                    prefix:
                        (medicalRecord.profile as Profile)._id +
                        "/medicalRecords/" +
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
    }, [medicalRecord]);

    const resetObject = {
        profile: (medicalRecord?.profile as Profile)?._id || profileId || "",
        doctor: doctorId,
        recordName: medicalRecord?.recordName,
        recordType: medicalRecord?.recordType,
        dateOnDocument: moment(medicalRecord?.dateOnDocument).format(
            "YYYY-MM-DD"
        ),
        files: "" as "",
    };

    const fields: Field<MedicalRecordData>[] = [
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

    const onSubmit = (data: MedicalRecordData) => {
        if (data.files && data.files.length > 0) onOpen();

        handleUpload(
            id,
            _.omit(data, ["existingFiles"]),
            "/medicalRecords",
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
                header="Uploading Files..."
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
                    resetDependencies={[medicalRecord]}
                    heading={id == "new" ? "Upload Record" : "Edit Record"}
                    onSubmit={onSubmit}
                />
            </Box>
        </GridItem>
    );
};

export default MedicalRecordForm;
