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
import {
    BiDownload,
    BiEdit,
    BiFolderOpen,
    BiPlusMedical,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { ExternalRecord } from "../../../models/externalRecord";
import { BsDownload } from "react-icons/bs";
import moment from "moment";
import { FaDownload, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import { ColourPaletteContext } from "../../../contexts/colourPaletteContext";

interface Props {
    externalRecords: ExternalRecord[];
}

const ExternalRecordsPanel = ({ externalRecords }: Props) => {
    const { secondaryColour } = useContext(ColourPaletteContext);

    return (
        <Card
            boxShadow={"0px 0px 10px #b3b3b3"}
            maxWidth={"75vw"}
            marginBottom={"1rem"}
        >
            <CardHeader>
                <HStack justifyContent={"space-between"} paddingX={"20px"}>
                    <HStack color={secondaryColour}>
                        <BiFolderOpen size="20px" />
                        <Heading size="md">External Records</Heading>
                    </HStack>
                    <Button
                        as={Link}
                        to="/portal/user/appointments/new"
                        size="sm"
                        colorScheme="orange"
                        backgroundColor={secondaryColour}
                        leftIcon={<BiPlusMedical />}
                    >
                        Add Record
                    </Button>
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
                                <Th>Doctor</Th>
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
                                        {moment(record.dateOnDocument).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </Td>
                                    <Td>{record.doctor}</Td>
                                    <Td>{record.hospital}</Td>
                                    <Td isNumeric>
                                        <Button
                                            size={"xs"}
                                            colorScheme="orange"
                                            variant={"outline"}
                                            marginRight={"5px"}
                                        >
                                            <FaEdit />
                                        </Button>

                                        <Button
                                            size={"xs"}
                                            colorScheme="orange"
                                            variant={"outline"}
                                        >
                                            <FaDownload />
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

export default ExternalRecordsPanel;
