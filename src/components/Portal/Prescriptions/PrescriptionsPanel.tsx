import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    HStack,
    Heading,
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tooltip,
    Tr,
    useToast,
} from "@chakra-ui/react";
import moment from "moment";
import { BsDownload, BsPen, BsPencil, BsPlus, BsTrash } from "react-icons/bs";
import { PiNote } from "react-icons/pi";
import { Doctor } from "../../../models/doctor";
import { Hospital } from "../../../models/hospital";
import { Prescription } from "../../../models/prescription";
import colourPalette from "../../../utilities/colour-palette";
import { BiUpload } from "react-icons/bi";
import ProtectedComponent from "../../common/ProtectedComponent";
import { Link } from "react-router-dom";
import {
    handleDelete,
    handleDownload,
} from "../../../utilities/record-manager-service";
import Loader from "../../common/Loader";
import { FaDownload, FaPen, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { record } from "zod";

interface Props {
    prescriptions: Prescription[];
    profileId?: string;
    error: string;
    isLoading: boolean;
}

const PrescriptionsPanel = ({
    prescriptions,
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
                <HStack marginX={"20px"} justifyContent={"space-between"}>
                    <HStack>
                        <PiNote size="20px" />
                        <Heading size="md">Prescriptions</Heading>
                    </HStack>
                    <ProtectedComponent
                        hospital={
                            <Button
                                as={Link}
                                to={`/portal/prescriptions/new/${profileId}`}
                                size="sm"
                                colorScheme="pink"
                                variant={"outline"}
                                leftIcon={<BsPlus />}
                            >
                                Create Prescription
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
                        {prescriptions.length === 0 ? (
                            <>There are no prescriptions to show</>
                        ) : (
                            <Table variant="simple" size={"sm"}>
                                <Thead>
                                    <Tr>
                                        <Th>Date</Th>
                                        {/* <Th>Hospital</Th> */}
                                        <Th isNumeric></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {prescriptions.map((p) => (
                                        <Tr key={p._id}>
                                            <Td>
                                                {moment(
                                                    p.dateOnDocument
                                                ).format("DD/MM/YYYY")}
                                            </Td>
                                            {/* <Td>
                                        {
                                            (
                                                (p.doctor as Doctor)
                                                    .hospital as Hospital
                                            ).name
                                        }
                                    </Td> */}

                                            <Td isNumeric>
                                                <ProtectedComponent
                                                    hospital={
                                                        <Tooltip label="Edit">
                                                            <IconButton
                                                                icon={<FaPen />}
                                                                aria-label="Edit Record"
                                                                as={Link}
                                                                to={`/portal/prescriptions/${p._id}`}
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
                                                            handleDownload(p);
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
                                                                        p,
                                                                        toast,
                                                                        "/prescriptions"
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

export default PrescriptionsPanel;
