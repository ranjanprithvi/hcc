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
import { handleUpload } from "../../../utilities/record-manager-service";
import Modal from "../../common/Modal";
import { useEffect, useState } from "react";

const schema = z.object({
    files: z.instanceof(FileList).optional(),
    profileId: z.string(),
    doctorId: z.string(),
    dateOnDocument: z.string(),
    recordName: z.string(),
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
    const { id, profileId } = useParams();
    if (!id) return null;

    const { prescription, error } = usePrescription(id);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const result = await list({
                    prefix: "hcc/" + profileId + "/Prescriptions/" + id + "/",
                });
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFiles();
    }, []);

    console.log(prescription);
    if (error) {
        return <div>{error}</div>;
    }

    const resetObject = {
        profileId: (prescription?.profile as Profile)?._id || profileId || "",
        doctorId: doctorId,
        dateOnDocument: moment(prescription?.dateOnDocument).format(
            "YYYY-MM-DD"
        ),
        recordName:
            prescription?.folderPath?.split("/").pop() || Date.now().toString(),
        // files: undefined,
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

    if (id == "new") {
        fields.push({
            type: "textInput",
            label: "Files",
            name: "files",
            inputType: "file",
        });
    }

    const onSubmit = (data: PrescriptionData) => {
        if (data.files && data.files.length > 0) onOpen();

        if (id == "new") {
            handleUpload<PrescriptionData, Prescription>(
                id,
                data,
                "Prescriptions",
                "/prescriptions",
                handleProgress,
                `/portal/profileOverview/${profileId}`,
                toast,
                navigate
            );
        } else {
            console.log(data);
        }
    };

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
                    heading={"Upload"}
                    onSubmit={onSubmit}
                />
            </Box>
        </GridItem>
    );
};

export default PrescriptionForm;
