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
import colourPalette from "../../utilities/colour-palette";

interface Props {
    path: string;
    isOpen: boolean;
    onClose: () => void;
    header?: string;
    headerColour?: string;
    leftPanel?: React.ReactNode;
    content?: string;
}

const GalleryModal = ({
    path,
    isOpen,
    onClose,
    header,
    leftPanel,
    headerColour,
    content,
}: Props) => {
    const [index, setIndex] = useState(content ? -1 : 0);

    const { urls, isLoading } = useURLs(path);

    const min = content ? -1 : 0;

    const current = content ? index + 2 : index + 1;
    const total = content ? urls.length + 1 : urls.length;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"full"}
            scrollBehavior="inside"
        >
            <ModalContent>
                <ModalHeader
                    borderBottom={"3px solid #848484"}
                    color={headerColour || "black"}
                    fontWeight={"bold"}
                    fontSize={"xl"}
                    textAlign={"center"}
                >
                    {header}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack height={"82vh"}>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <Grid
                                templateColumns={leftPanel ? "1fr 6fr" : "auto"}
                                width={"100%"}
                                height={"100%"}
                            >
                                {leftPanel}
                                <Box
                                    width={"100%"}
                                    height={"100%"}
                                    border={"1px solid #d5d5d5"}
                                    borderRadius={"5px"}
                                >
                                    <HStack height={"100%"} spacing={"0"}>
                                        {!content && urls.length === 0 ? (
                                            <Text
                                                margin={"auto"}
                                                fontWeight={"bold"}
                                            >
                                                No content to show
                                            </Text>
                                        ) : (
                                            <>
                                                <Flex
                                                    width={"5%"}
                                                    height={"100%"}
                                                    justifyContent={"flex-end"}
                                                    backgroundColor={"#d4d4d4"}
                                                    alignItems={"center"}
                                                >
                                                    <IconButton
                                                        aria-label={"Previous"}
                                                        color={"#797979"}
                                                        isDisabled={
                                                            index === min
                                                        }
                                                        icon={
                                                            <IoIosArrowDropleftCircle
                                                                size={"50px"}
                                                            />
                                                        }
                                                        onClick={() =>
                                                            setIndex(
                                                                (i) => i - 1
                                                            )
                                                        }
                                                        variant={"ghost"}
                                                        _hover={{
                                                            backgroundColor:
                                                                "transparent",
                                                            color: "black",
                                                        }}
                                                        _disabled={{
                                                            visibility:
                                                                "hidden",
                                                        }}
                                                    />
                                                </Flex>
                                                {index === -1 ? (
                                                    <Text
                                                        padding={"20px"}
                                                        width={"100%"}
                                                        height={"100%"}
                                                    >
                                                        {content}
                                                    </Text>
                                                ) : (
                                                    <Box
                                                        width={"100%"}
                                                        height={"100%"}
                                                    >
                                                        {/* <Heading
                                                    size="sm"
                                                    color={"grayText"}
                                                >
                                                    {" "}
                                                    {urls[index]?.pathname
                                                        .split("/")
                                                        .pop()
                                                        ?.replace(/%20/g, " ")
                                                        .replace(/%28/g, "(")
                                                        .replace(/%29/g, ")") ||
                                                        ""}
                                                </Heading> */}
                                                        <iframe
                                                            src={
                                                                urls[index]
                                                                    ?.href || ""
                                                            }
                                                            width={"100%"}
                                                            height={"100%"}
                                                        />
                                                    </Box>
                                                )}
                                                <Flex
                                                    width={"5%"}
                                                    backgroundColor="#d5d5d5"
                                                    height={"100%"}
                                                    alignItems={"center"}
                                                >
                                                    <IconButton
                                                        aria-label={"Previous"}
                                                        color={"#797979"}
                                                        isDisabled={
                                                            index ===
                                                            urls.length - 1
                                                        }
                                                        icon={
                                                            <IoIosArrowDroprightCircle
                                                                size={"50px"}
                                                            />
                                                        }
                                                        onClick={() =>
                                                            setIndex(
                                                                (i) => i + 1
                                                            )
                                                        }
                                                        variant={"ghost"}
                                                        _hover={{
                                                            backgroundColor:
                                                                "transparent",
                                                            color: "black",
                                                        }}
                                                        _disabled={{
                                                            visibility:
                                                                "hidden",
                                                        }}
                                                    />
                                                </Flex>
                                            </>
                                        )}
                                    </HStack>
                                    <Text
                                        fontSize={"sm"}
                                        color={"gray.500"}
                                        textAlign={"center"}
                                    >
                                        {current} of {total}
                                    </Text>
                                </Box>
                            </Grid>
                        )}
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
    // return <></>;
};

export default GalleryModal;
