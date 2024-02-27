import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    HStack,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
} from "@chakra-ui/react";
import moment from "moment";
import { BsDownload, BsTrash } from "react-icons/bs";
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
                                                <Button
                                                    leftIcon={<BsDownload />}
                                                    size={"xs"}
                                                    colorScheme="pink"
                                                    onClick={() => {
                                                        handleDownload(p);
                                                    }}
                                                >
                                                    Download
                                                </Button>
                                                <ProtectedComponent
                                                    hospital={
                                                        <Button
                                                            leftIcon={
                                                                <BsTrash />
                                                            }
                                                            size={"xs"}
                                                            colorScheme="red"
                                                            marginLeft={"5px"}
                                                            onClick={() => {
                                                                handleDelete(
                                                                    p,
                                                                    toast,
                                                                    "/prescriptions"
                                                                );
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
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
