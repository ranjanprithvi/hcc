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
    Grid,
    VStack,
    Heading,
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
    header?: string;
    leftPanel?: React.ReactNode;
}

const GalleryModal = ({ path, isOpen, onClose, header, leftPanel }: Props) => {
    const [index, setIndex] = useState(0);

    const { urls, isLoading } = useURLs(path);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
            <ModalContent>
                <ModalHeader>{header}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack height={"88vh"}>
                        <Grid
                            templateColumns={leftPanel ? "1fr 5fr" : "auto"}
                            width={"100%"}
                            height={"100%"}
                        >
                            {leftPanel}
                            <HStack height={"100%"}>
                                {isLoading ? (
                                    <Loader />
                                ) : urls.length === 0 ? (
                                    <Text margin={"auto"} fontWeight={"bold"}>
                                        No files to show
                                    </Text>
                                ) : (
                                    <>
                                        <Flex
                                            width={"5%"}
                                            justifyContent={"flex-end"}
                                        >
                                            <IconButton
                                                aria-label={"Previous"}
                                                color={"#d4d4d4"}
                                                isDisabled={index === 0}
                                                icon={
                                                    <IoIosArrowDropleftCircle
                                                        size={"50px"}
                                                    />
                                                }
                                                onClick={() =>
                                                    setIndex((i) => i - 1)
                                                }
                                                variant={"ghost"}
                                                _hover={{
                                                    backgroundColor:
                                                        "transparent",
                                                    color: "black",
                                                }}
                                                _disabled={{
                                                    visibility: "hidden",
                                                }}
                                            />
                                        </Flex>
                                        <Box width={"100%"} height={"100%"}>
                                            <Heading
                                                size="sm"
                                                color={"grayText"}
                                            >
                                                {" "}
                                                {urls[index]?.pathname
                                                    .split("/")
                                                    .pop()
                                                    ?.replace(/%20/g, " ")
                                                    .replace(/%28/g, "(")
                                                    .replace(/%29/g, ")") || ""}
                                            </Heading>
                                            <iframe
                                                src={urls[index]?.href || ""}
                                                width={"100%"}
                                                height={"100%"}
                                            />
                                        </Box>
                                        <Box width={"5%"}>
                                            <IconButton
                                                aria-label={"Previous"}
                                                color={"#d4d4d4"}
                                                isDisabled={
                                                    index === urls.length - 1
                                                }
                                                icon={
                                                    <IoIosArrowDroprightCircle
                                                        size={"50px"}
                                                    />
                                                }
                                                onClick={() =>
                                                    setIndex((i) => i + 1)
                                                }
                                                variant={"ghost"}
                                                _hover={{
                                                    backgroundColor:
                                                        "transparent",
                                                    color: "black",
                                                }}
                                                _disabled={{
                                                    visibility: "hidden",
                                                }}
                                            />
                                        </Box>
                                    </>
                                )}
                            </HStack>
                        </Grid>
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
    // return <></>;
};

export default GalleryModal;
