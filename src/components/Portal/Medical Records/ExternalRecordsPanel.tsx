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
    Tooltip,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react";
import { BiFolderOpen, BiUpload } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ExternalRecord } from "../../../models/externalRecord";
import moment from "moment";
import { FaDownload, FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import colourPalette from "../../../utilities/colour-palette";
import ProtectedComponent from "../../common/ProtectedComponent";
import {
    deleteFolderFromS3,
    handleDelete,
    handleViewRecord,
} from "../../../utilities/record-manager-service";
import Loader from "../../common/Loader";
import { useState } from "react";
import GalleryModal from "../GalleryModal";

interface Props {
    externalRecords: ExternalRecord[];
    error: string;
    isLoading: boolean;
}

const ExternalRecordsPanel = ({ externalRecords, error, isLoading }: Props) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [galleryPath, setGalleryPath] = useState("");

    return (
        <>
            {isOpen && (
                <GalleryModal
                    path={galleryPath}
                    isOpen={isOpen}
                    onClose={onClose}
                ></GalleryModal>
            )}
            <Card
                boxShadow={"0px 0px 10px #b3b3b3"}
                maxWidth={"75vw"}
                marginBottom={"1rem"}
            >
                <CardHeader>
                    <HStack justifyContent={"space-between"} paddingX={"20px"}>
                        <HStack color={colourPalette.secondary}>
                            <BiFolderOpen size="20px" />
                            <Heading size="md">External Records</Heading>
                        </HStack>
                        <ProtectedComponent
                            hospital={<></>}
                            user={
                                <Button
                                    as={Link}
                                    to={`/portal/externalRecords/new`}
                                    size="sm"
                                    colorScheme="orange"
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
                            {externalRecords.length === 0 ? (
                                <>There are no records to show</>
                            ) : (
                                <Table variant="simple" size={"sm"}>
                                    <Thead>
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th>Type</Th>
                                            <Th>Date</Th>
                                            <Th>Doctor</Th>
                                            <Th>Specialization</Th>
                                            <Th>Hospital</Th>
                                            <Th isNumeric></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {externalRecords.map((record) => (
                                            <Tr key={record._id}>
                                                <Td>{record.recordName}</Td>
                                                <Td>{record.recordType}</Td>
                                                <Td>
                                                    {moment(
                                                        record.dateOnDocument
                                                    ).format("DD/MM/YYYY")}
                                                </Td>
                                                <Td>{record.doctor}</Td>
                                                <Td>
                                                    {record.specialization.name}
                                                </Td>
                                                <Td>{record.hospital}</Td>
                                                <Td isNumeric>
                                                    <Tooltip label="View">
                                                        <IconButton
                                                            icon={<FaEye />}
                                                            aria-label="View Record"
                                                            size={"xs"}
                                                            colorScheme="orange"
                                                            variant={"outline"}
                                                            // as={Link}
                                                            // to={
                                                            //     "/gallery/" +
                                                            //     p.profile +
                                                            //     "%2FexternalPrescriptions%2F" +
                                                            //     p._id
                                                            // }
                                                            onClick={() => {
                                                                setGalleryPath(
                                                                    record.profile +
                                                                        "/externalRecords/" +
                                                                        record._id
                                                                );
                                                                onOpen();
                                                            }}
                                                            marginLeft={"5px"}
                                                        />
                                                    </Tooltip>
                                                    <ProtectedComponent
                                                        hospital={<></>}
                                                        user={
                                                            <Tooltip label="Edit">
                                                                <IconButton
                                                                    icon={
                                                                        <FaPen />
                                                                    }
                                                                    aria-label="Edit Record"
                                                                    size={"xs"}
                                                                    colorScheme="orange"
                                                                    variant={
                                                                        "outline"
                                                                    }
                                                                    as={Link}
                                                                    to={`/portal/externalRecords/${record._id}`}
                                                                    marginLeft={
                                                                        "5px"
                                                                    }
                                                                />
                                                            </Tooltip>
                                                        }
                                                    ></ProtectedComponent>
                                                    {/* <Tooltip label="Download">
                                                    <IconButton
                                                        icon={<FaDownload />}
                                                        aria-label="Download Record"
                                                        size={"xs"}
                                                        colorScheme="orange"
                                                        variant={"outline"}
                                                        onClick={() => {
                                                            handleViewRecord(
                                                                record.profile +
                                                                    "/externalRecords/" +
                                                                    record._id +
                                                                    "/"
                                                            );
                                                        }}
                                                    />
                                                </Tooltip> */}
                                                    <ProtectedComponent
                                                        hospital={<></>}
                                                        user={
                                                            <Tooltip label="Delete">
                                                                <IconButton
                                                                    icon={
                                                                        <FaTrashAlt />
                                                                    }
                                                                    aria-label="Delete Record"
                                                                    size={"xs"}
                                                                    colorScheme="orange"
                                                                    marginLeft={
                                                                        "5px"
                                                                    }
                                                                    onClick={() => {
                                                                        handleDelete(
                                                                            record,
                                                                            "/externalRecords",
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

export default ExternalRecordsPanel;
