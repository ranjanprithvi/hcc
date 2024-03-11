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
} from "@chakra-ui/react";
import { BiFolder, BiUpload } from "react-icons/bi";
import { MedicalRecord } from "../../../models/medicalRecord";
import { BsDownload } from "react-icons/bs";
import { GoTrash } from "react-icons/go";
import moment from "moment";
import colourPalette from "../../../utilities/colour-palette";
import ProtectedComponent from "../../common/ProtectedComponent";
import { Link } from "react-router-dom";
import {
    handleDelete,
    handleDownload,
} from "../../../utilities/record-manager-service";
import Loader from "../../common/Loader";
import { FaDownload, FaPen, FaTrash, FaTrashAlt } from "react-icons/fa";

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

    return (
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
                                            <Td>
                                                {record.folderPath
                                                    ?.split("/")
                                                    .pop()}
                                            </Td>
                                            <Td>{record.recordType}</Td>
                                            <Td>
                                                {moment(
                                                    record.dateOnDocument
                                                ).format("DD/MM/YYYY")}
                                            </Td>

                                            <Td isNumeric>
                                                <ProtectedComponent
                                                    hospital={
                                                        <Tooltip label="Edit">
                                                            <IconButton
                                                                icon={<FaPen />}
                                                                aria-label="Edit Record"
                                                                as={Link}
                                                                to={`/portal/medicalRecords/${record._id}`}
                                                                size={"xs"}
                                                                colorScheme="pink"
                                                                variant={
                                                                    "outline"
                                                                }
                                                            ></IconButton>
                                                        </Tooltip>
                                                    }
                                                ></ProtectedComponent>
                                                <Tooltip label="Download">
                                                    <IconButton
                                                        icon={<FaDownload />}
                                                        aria-label="Download Record"
                                                        size={"xs"}
                                                        colorScheme="pink"
                                                        variant={"outline"}
                                                        marginLeft={"5px"}
                                                        onClick={() => {
                                                            handleDownload(
                                                                record
                                                            );
                                                        }}
                                                    />
                                                </Tooltip>

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
                                                                        toast,
                                                                        "/medicalRecords"
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
    );
};

export default MedicalRecords;
