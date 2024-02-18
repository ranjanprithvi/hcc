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
} from "@chakra-ui/react";
import moment from "moment";
import React, { useContext } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { FaEdit, FaDownload } from "react-icons/fa";
import { PiNoteBlank } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ColourPaletteContext } from "../../../contexts/colourPaletteContext";
import { ExternalPrescription } from "../../../models/externalPrescription";

interface Props {
    externalPrescriptions: ExternalPrescription[];
}

const ExternalPrescriptionsPanel = ({ externalPrescriptions }: Props) => {
    const { primaryColour, secondaryColour } = useContext(ColourPaletteContext);

    return (
        <Card
            boxShadow={"0px 0px 10px #b3b3b3"}
            maxWidth={"75vw"}
            marginBottom={"1rem"}
        >
            <CardHeader>
                <HStack justifyContent={"space-between"} paddingX={"20px"}>
                    <HStack color={secondaryColour}>
                        <PiNoteBlank size="20px" />
                        <Heading size="md">External Prescriptions</Heading>
                    </HStack>
                    <Button
                        as={Link}
                        to="/portal/user/appointments/new"
                        size="sm"
                        colorScheme="orange"
                        backgroundColor={secondaryColour}
                        leftIcon={<BiPlusMedical />}
                    >
                        Add Prescription
                    </Button>
                </HStack>
            </CardHeader>
            <Divider color={"gray.300"} />

            <CardBody>
                <TableContainer paddingX={"20px"}>
                    <Table variant="simple" size={"sm"}>
                        <Thead>
                            <Tr>
                                <Th>Date</Th>
                                <Th>Doctor</Th>
                                <Th>Hospital</Th>
                                <Th isNumeric></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {externalPrescriptions.map((p) => (
                                <Tr key={p._id}>
                                    <Td>
                                        {moment(p.dateOnDocument).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </Td>
                                    <Td>{p.doctor}</Td>
                                    <Td>{p.hospital}</Td>
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

export default ExternalPrescriptionsPanel;