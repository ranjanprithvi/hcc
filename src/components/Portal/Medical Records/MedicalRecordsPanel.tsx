import {
    Card,
    CardHeader,
    Heading,
    CardBody,
    HStack,
    Button,
    Divider,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
    IconButton,
    Tooltip,
    useDisclosure,
    Box,
    VStack,
    Text,
} from "@chakra-ui/react";
import { BiFolder, BiUpload } from "react-icons/bi";
import { MedicalRecord } from "../../../models/medicalRecord";
import moment from "moment";
import colourPalette from "../../../utilities/colour-palette";
import ProtectedComponent from "../../common/ProtectedComponent";
import { Link } from "react-router-dom";
import {
    handleViewRecord,
    handleDelete,
} from "../../../utilities/record-manager-service";
import Loader from "../../common/Loader";
import { FaDownload, FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import { error } from "console";
import GalleryModal from "../GalleryModal";
import { useState } from "react";

interface Props {
    medicalRecords: MedicalRecord[];
    profileId?: string;
    error: string;
    isLoading: boolean;
}

const MedicalRecords = ({
    medicalRecords,
    profileId,
    error,
    isLoading,
}: Props) => {
    const toast = useToast();

    // const handleDelete = (record: MedicalRecord) => {
    //     deleteFolderFromS3(record.profile + "/MedicalRecords/" + record._id)
    //         .then(() => {
    //             toast({
    //                 title: `${
    //                     record.recordName || "Record"
    //                 } deleted from storage`,
    //                 status: "success",
    //                 duration: 3000,
    //             });
    //             deleteRecordFromDb(record, "/medicalRecords")
    //                 .then((res) => {
    //                     toast({
    //                         title: `${
    //                             record.recordName || "Record"
    //                         } deleted from database`,
    //                         status: "success",
    //                         duration: 3000,
    //                     });
    //                 })
    //                 .catch((error) => {
    //                     toast({
    //                         title: "Error while deleting record",
    //                         description: error.message,
    //                         status: "error",
    //                         duration: 5000,
    //                         isClosable: true,
    //                     });
    //                 });
    //         })
    //         .catch((error) => {
    //             toast({
    //                 title: "Error while deleting folder",
    //                 description: error.message,
    //                 status: "error",
    //                 duration: 5000,
    //                 isClosable: true,
    //             });
    //         });
    // };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRecord, setSelectedRecord] = useState({
        path: "",
        header: "",
        leftPanel: <></>,
    });

    return (
        <>
            {isOpen && (
                <GalleryModal
                    path={selectedRecord.path}
                    isOpen={isOpen}
                    onClose={onClose}
                    header={selectedRecord.header}
                    leftPanel={selectedRecord.leftPanel}
                ></GalleryModal>
            )}

            <Card
                boxShadow={"0px 0px 10px #b3b3b3"}
                maxWidth={"75vw"}
                marginBottom={"1rem"}
            >
                <CardHeader color={colourPalette.primary}>
                    <HStack justifyContent={"space-between"} marginX={"20px"}>
                        <HStack>
                            <BiFolder size="20px" />
                            <Heading size="md">Medical Records</Heading>
                        </HStack>
                        <ProtectedComponent
                            hospital={
                                <Button
                                    as={Link}
                                    to={`/portal/medicalRecords/new/${profileId}`}
                                    size="sm"
                                    colorScheme="pink"
                                    variant={"outline"}
                                    leftIcon={<BiUpload />}
                                >
                                    Upload Record
                                </Button>
                            }
                        ></ProtectedComponent>
                    </HStack>
                </CardHeader>
                <Divider color={"gray.300"} />

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <CardBody>
                        <TableContainer paddingX={"20px"}>
                            {medicalRecords.length === 0 ? (
                                <>There are no records to show</>
                            ) : (
                                <Table variant="simple" size={"sm"}>
                                    <Thead>
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th>Type</Th>
                                            <Th>Date</Th>
                                            <Th isNumeric></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {medicalRecords.map((record) => (
                                            <Tr key={record._id}>
                                                <Td>{record.recordName}</Td>
                                                <Td>{record.recordType}</Td>
                                                <Td>
                                                    {moment(
                                                        record.dateOnDocument
                                                    ).format("DD/MM/YYYY")}
                                                </Td>

                                                <Td isNumeric>
                                                    <Tooltip label="View">
                                                        <IconButton
                                                            icon={<FaEye />}
                                                            aria-label="Download Record"
                                                            size={"xs"}
                                                            colorScheme="pink"
                                                            variant={"outline"}
                                                            // as={Link}
                                                            // to={
                                                            //     "/gallery/" +
                                                            //     p.profile +
                                                            //     "%2FexternalPrescriptions%2F" +
                                                            //     p._id
                                                            // }
                                                            onClick={() => {
                                                                setSelectedRecord(
                                                                    {
                                                                        path:
                                                                            record.profile +
                                                                            "/medicalRecords/" +
                                                                            record._id,
                                                                        header:
                                                                            "Medical Record - " +
                                                                            record.recordName,
                                                                        leftPanel:
                                                                            (
                                                                                <VStack
                                                                                    alignItems={
                                                                                        "flex-start"
                                                                                    }
                                                                                    padding={
                                                                                        "20px 20px 0 0"
                                                                                    }
                                                                                >
                                                                                    <Box
                                                                                        width={
                                                                                            "100%"
                                                                                        }
                                                                                        borderBottom={
                                                                                            "1px solid #d5d5d5"
                                                                                        }
                                                                                    >
                                                                                        <Heading size="xs">
                                                                                            Doctor
                                                                                        </Heading>
                                                                                        <Text>
                                                                                            Roopa
                                                                                            Ravi
                                                                                        </Text>
                                                                                    </Box>
                                                                                    <Box
                                                                                        borderBottom={
                                                                                            "1px solid #d5d5d5"
                                                                                        }
                                                                                        width={
                                                                                            "100%"
                                                                                        }
                                                                                    >
                                                                                        <Heading size="xs">
                                                                                            Hospital
                                                                                        </Heading>
                                                                                        <Text>
                                                                                            Heart
                                                                                            Care
                                                                                            Clinic
                                                                                        </Text>
                                                                                    </Box>
                                                                                    <Box
                                                                                        borderBottom={
                                                                                            "1px solid #d5d5d5"
                                                                                        }
                                                                                        width={
                                                                                            "100%"
                                                                                        }
                                                                                    >
                                                                                        <Heading size="xs">
                                                                                            Specialization
                                                                                        </Heading>
                                                                                        <Text>
                                                                                            Cardiology
                                                                                        </Text>
                                                                                    </Box>
                                                                                    <Box>
                                                                                        <Heading size="xs">
                                                                                            Date
                                                                                        </Heading>
                                                                                        <Text>
                                                                                            {moment(
                                                                                                record.dateOnDocument
                                                                                            ).format(
                                                                                                "DD/MM/YYYY"
                                                                                            )}
                                                                                        </Text>
                                                                                    </Box>
                                                                                </VStack>
                                                                            ),
                                                                    }
                                                                );
                                                                onOpen();
                                                            }}
                                                            marginLeft={"5px"}
                                                        />
                                                    </Tooltip>
                                                    <ProtectedComponent
                                                        hospital={
                                                            <Tooltip label="Edit">
                                                                <IconButton
                                                                    icon={
                                                                        <FaPen />
                                                                    }
                                                                    aria-label="Edit Record"
                                                                    as={Link}
                                                                    to={`/portal/medicalRecords/${record._id}`}
                                                                    size={"xs"}
                                                                    colorScheme="pink"
                                                                    variant={
                                                                        "outline"
                                                                    }
                                                                    marginLeft={
                                                                        "5px"
                                                                    }
                                                                ></IconButton>
                                                            </Tooltip>
                                                        }
                                                    ></ProtectedComponent>

                                                    <ProtectedComponent
                                                        hospital={
                                                            <Tooltip label="Delete">
                                                                <IconButton
                                                                    icon={
                                                                        <FaTrashAlt />
                                                                    }
                                                                    aria-label="Delete Record"
                                                                    size={"xs"}
                                                                    colorScheme="pink"
                                                                    marginLeft={
                                                                        "5px"
                                                                    }
                                                                    onClick={() => {
                                                                        handleDelete(
                                                                            record,
                                                                            "/medicalRecords",
                                                                            toast,
                                                                            () =>
                                                                                window.location.reload()
                                                                        );
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        }
                                                    ></ProtectedComponent>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            )}
                        </TableContainer>
                    </CardBody>
                )}
            </Card>
        </>
    );
};

export default MedicalRecords;
