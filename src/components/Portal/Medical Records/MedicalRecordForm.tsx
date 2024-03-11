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
import useMedicalRecord from "../../../hooks/useMedicalRecord";
import { useNavigate, useParams } from "react-router-dom";
import { doctorId } from "../../../App";
import { MedicalRecord } from "../../../models/medicalRecord";
import moment from "moment";
import { TransferProgressEvent, list } from "aws-amplify/storage";
import { Profile } from "../../../models/profile";
import { handleUpload } from "../../../utilities/record-manager-service";
import Modal from "../../common/Modal";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const result = await list({
                    prefix:
                        "hcc/" +
                        profileId +
                        "/MedicalRecords/" +
                        "asdfsd" +
                        "/",
                });
                console.log(result.items[0].key);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFiles();
    }, []);

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
        onOpen();
        if (id == "new") {
            handleUpload<MedicalRecordData, MedicalRecord>(
                id,
                data,
                "MedicalRecords",
                "/medicalRecords",
                handleProgress,
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
