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
} from "@chakra-ui/react";
import { BiFolderOpen, BiUpload } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ExternalRecord } from "../../../models/externalRecord";
import moment from "moment";
import { FaDownload, FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import colourPalette from "../../../utilities/colour-palette";
import ProtectedComponent from "../../common/ProtectedComponent";
import { getUrl, remove } from "aws-amplify/storage";
import { File } from "../../../models/file";
import { httpService } from "../../../services/http-service";
import {
    handleDelete,
    handleDownload,
} from "../../../utilities/record-manager-service";
import Loader from "../../common/Loader";

interface Props {
    externalRecords: ExternalRecord[];
    error: string;
    isLoading: boolean;
}

const ExternalRecordsPanel = ({ externalRecords, error, isLoading }: Props) => {
    const toast = useToast();

    return (
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
                                            <Td>
                                                {record.folderPath
                                                    .split("/")
                                                    .pop()}
                                            </Td>
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
                                                <Tooltip label="Download">
                                                    <IconButton
                                                        icon={<FaDownload />}
                                                        aria-label="Download Record"
                                                        size={"xs"}
                                                        colorScheme="orange"
                                                        variant={"outline"}
                                                        onClick={() => {
                                                            handleDownload(
                                                                record
                                                            );
                                                        }}
                                                    />
                                                </Tooltip>
                                                <ProtectedComponent
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
                                                                        toast,
                                                                        "/externalRecords"
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

export default ExternalRecordsPanel;
