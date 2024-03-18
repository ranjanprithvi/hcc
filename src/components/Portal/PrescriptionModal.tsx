import {
    Box,
    Flex,
    HStack,
    IconButton,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalBody,
    Text,
    VStack,
    ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import useURLs from "../../hooks/useURLs";
import Loader from "../common/Loader";

interface Props {
    path: string;
    isOpen: boolean;
    onClose: () => void;
    header: string;
    content: string;
}

const PrescriptionModal = ({
    path,
    isOpen,
    onClose,
    header,
    content,
}: Props) => {
    const [index, setIndex] = useState(0);

    const { urls, isLoading } = useURLs(path);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"full"}
            scrollBehavior="inside"
        >
            <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="1px" />

            <ModalContent>
                <ModalHeader>{header}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <Flex
                            flexDirection={"column"}
                            width={"100%"}
                            height={"100%"}
                            alignItems={"center"}
                        >
                            {content && <Box height={"10%"}>{content}</Box>}
                            <Box width={"80%"} height={"100%"}>
                                {urls.map((url) => (
                                    <iframe
                                        src={url.href || ""}
                                        height={"100%"}
                                        width={"100%"}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            left: 0,
                                        }}
                                    />
                                ))}
                            </Box>
                        </Flex>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
    // return <></>;
};

export default PrescriptionModal;
