import {
    Card,
    CardHeader,
    HStack,
    Heading,
    Button,
    Divider,
    CardBody,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    useToast,
    Tooltip,
} from "@chakra-ui/react";
import moment from "moment";
import { BiPlusMedical, BiUpload } from "react-icons/bi";
import { FaEdit, FaDownload, FaTrash, FaTrashAlt } from "react-icons/fa";
import { PiNoteBlank } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ExternalPrescription } from "../../../models/externalPrescription";
import colourPalette from "../../../utilities/colour-palette";
import ProtectedComponent from "../../common/ProtectedComponent";
import {
    handleDelete,
    handleDownload,
} from "../../../utilities/record-manager-service";
import Loader from "../../common/Loader";

interface Props {
    externalPrescriptions: ExternalPrescription[];
    error: string;
    isLoading: boolean;
}

const ExternalPrescriptionsPanel = ({
    externalPrescriptions,
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
            <CardHeader>
                <HStack justifyContent={"space-between"} paddingX={"20px"}>
                    <HStack color={colourPalette.secondary}>
                        <PiNoteBlank size="20px" />
                        <Heading size="md">External Prescriptions</Heading>
                    </HStack>
                    <ProtectedComponent
                        hospital={<></>}
                        user={
                            <Button
                                as={Link}
                                to="/portal/externalPrescriptions/new"
                                size="sm"
                                colorScheme="orange"
                                variant={"outline"}
                                leftIcon={<BiUpload />}
                            >
                                Upload Prescription
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
                        {externalPrescriptions.length === 0 ? (
                            <>There are no prescriptions to show</>
                        ) : (
                            <Table variant="simple" size={"sm"}>
                                <Thead>
                                    <Tr>
                                        <Th>Date</Th>
                                        <Th>Doctor</Th>
                                        <Th>Specialization</Th>
                                        <Th>Hospital</Th>
                                        <Th isNumeric></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {externalPrescriptions.map((p) => (
                                        <Tr key={p._id}>
                                            <Td>
                                                {moment(
                                                    p.dateOnDocument
                                                ).format("DD/MM/YYYY")}
                                            </Td>
                                            <Td>{p.doctor}</Td>
                                            <Td>{p.specialization.name}</Td>
                                            <Td>{p.hospital}</Td>
                                            <Td isNumeric>
                                                <Tooltip label="Download">
                                                    <Button
                                                        size={"xs"}
                                                        colorScheme="orange"
                                                        onClick={() => {
                                                            handleDownload(p);
                                                        }}
                                                    >
                                                        <FaDownload />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip label="Delete">
                                                    <Button
                                                        size={"xs"}
                                                        colorScheme="red"
                                                        marginLeft={"5px"}
                                                        onClick={() => {
                                                            handleDelete(
                                                                p,
                                                                toast,
                                                                "/externalPrescriptions"
                                                            );
                                                        }}
                                                    >
                                                        <FaTrashAlt />
                                                    </Button>
                                                </Tooltip>
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

export default ExternalPrescriptionsPanel;
