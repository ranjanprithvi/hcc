import {
    UnorderedList,
    ListItem,
    Flex,
    Text,
    List,
    HStack,
    IconButton,
    useToast,
    Tooltip,
    Button,
} from "@chakra-ui/react";
import React from "react";
import TruncatedText from "../common/TruncatedText";
import { convertBytes } from "../../utilities/convertBytes";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
    deleteFileFromS3,
    handleViewFile,
} from "../../utilities/record-manager-service";

interface Props {
    files: { key: string; size?: number }[];
}

const FilesList = ({ files }: Props) => {
    const toast = useToast();
    return (
        <List width={"100%"} paddingX={"20px"}>
            {files.map((f) => {
                const fileName = f.key.split("/").pop() || "";
                return (
                    <ListItem color={"GrayText"}>
                        <Flex
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            width={"100%"}
                        >
                            <Button
                                variant={"link"}
                                onClick={() => handleViewFile(f.key)}
                            >
                                <TruncatedText
                                    text={fileName}
                                    length={20}
                                    fontSize={"sm"}
                                />
                            </Button>
                            <HStack>
                                <Text fontSize={"sm"}>
                                    {convertBytes(f.size || 0)}
                                </Text>
                                <Tooltip label={"Delete File"}>
                                    <IconButton
                                        icon={
                                            <IoIosCloseCircleOutline
                                                size={"20px"}
                                            />
                                        }
                                        aria-label="delete"
                                        size={"xs"}
                                        variant={"ghost"}
                                        onClick={() => {
                                            deleteFileFromS3(f.key).then(() => {
                                                toast({
                                                    title: "File deleted",
                                                    status: "success",
                                                    position: "bottom-right",
                                                });
                                                setTimeout(() => {
                                                    window.location.reload();
                                                }, 1000);
                                            });
                                        }}
                                    ></IconButton>
                                </Tooltip>
                            </HStack>
                        </Flex>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default FilesList;
