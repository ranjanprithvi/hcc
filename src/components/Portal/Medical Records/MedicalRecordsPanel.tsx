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
} from "@chakra-ui/react";
import { BiFolder, BiPlusCircle, BiUpload } from "react-icons/bi";
import { MedicalRecord } from "../../../models/medicalRecord";
import { BsDownload } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import moment from "moment";
import colourPalette from "../../../utilities/colour-palette";
import ProtectedComponent from "../../common/ProtectedComponent";
import { Link } from "react-router-dom";

interface Props {
    medicalRecords: MedicalRecord[];
}

const MedicalRecords = ({ medicalRecords }: Props) => {
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
                                to="/portal/medicalRecords/new"
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

            <CardBody>
                <TableContainer paddingX={"20px"}>
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
                                        {moment(record.dateOnDocument).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </Td>

                                    <Td isNumeric>
                                        <ProtectedComponent
                                            hospital={
                                                <Button
                                                    as={Link}
                                                    to={`/portal/medicalRecords/${record._id}`}
                                                    leftIcon={<GoPencil />}
                                                    size={"xs"}
                                                    colorScheme="pink"
                                                    variant={"outline"}
                                                    marginRight={"5px"}
                                                >
                                                    Edit
                                                </Button>
                                            }
                                        ></ProtectedComponent>
                                        <Button
                                            leftIcon={<BsDownload />}
                                            size={"xs"}
                                            colorScheme="pink"
                                            variant={"outline"}
                                        >
                                            Download
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>
    );
};

export default MedicalRecords;
