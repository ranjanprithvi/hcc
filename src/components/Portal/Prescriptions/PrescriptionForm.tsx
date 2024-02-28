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
import Form, { Field } from "../../common/Form";
import usePrescription from "../../../hooks/usePrescription";
import { useNavigate, useParams } from "react-router-dom";
import { doctorId } from "../../../App";
import { Prescription } from "../../../models/prescription";
import moment from "moment";
import { TransferProgressEvent } from "aws-amplify/storage";
import { Profile } from "../../../models/profile";
import { handleUpload } from "../../../utilities/record-manager-service";
import Modal from "../../common/Modal";
import { useState } from "react";

const schema = z.object({
    files: z.instanceof(FileList),
    profileId: z.string(),
    doctorId: z.string(),
    dateOnDocument: z.string(),
    recordName: z.string(),
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

    if (error) {
        return <div>{error}</div>;
    }

    const resetObject = {
        profileId: (prescription?.profile as Profile)?._id || profileId || "",
        doctorId: doctorId,
        dateOnDocument: moment(prescription?.dateOnDocument).format(
            "YYYY-MM-DD"
        ),
        recordName: prescription?.folderPath?.split("/").pop() || "",
        files: {} as FileList,
    };

    const fields: Field<PrescriptionData>[] = [
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
        onOpen();
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
                marginTop="5%"
                padding={10}
                maxWidth={"600px"}
                background={"white"}
                borderRadius={"5px"}
                boxShadow={"0px 0px 10px #b3b3b3"}
            >
                <Form<PrescriptionData>
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
