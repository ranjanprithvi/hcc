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
} from "@chakra-ui/react";
import moment from "moment";
import React, { useContext } from "react";
import { BsDownload } from "react-icons/bs";
import { PiNote } from "react-icons/pi";
import { Doctor } from "../../../models/doctor";
import { Hospital } from "../../../models/hospital";
import { ColourPaletteContext } from "../../../contexts/colourPaletteContext";
import { Prescription } from "../../../models/prescription";

interface Props {
    prescriptions: Prescription[];
}

const PrescriptionsPanel = ({ prescriptions }: Props) => {
    const { primaryColour } = useContext(ColourPaletteContext);
    return (
        <Card
            boxShadow={"0px 0px 10px #b3b3b3"}
            maxWidth={"75vw"}
            marginBottom={"1rem"}
        >
            <CardHeader color={primaryColour}>
                <HStack marginX={"20px"}>
                    <PiNote size="20px" />
                    <Heading size="md">Prescriptions</Heading>
                </HStack>
            </CardHeader>
            <Divider color={"gray.300"} />

            <CardBody>
                <TableContainer paddingX={"20px"}>
                    <Table variant="simple" size={"sm"}>
                        <Thead>
                            <Tr>
                                <Th>Date</Th>
                                <Th>Hospital</Th>
                                <Th isNumeric></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {prescriptions.map((p) => (
                                <Tr key={p._id}>
                                    <Td>
                                        {moment(p.dateOnDocument).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </Td>
                                    <Td>
                                        {
                                            (
                                                (p.doctor as Doctor)
                                                    .hospital as Hospital
                                            ).name
                                        }
                                    </Td>

                                    <Td isNumeric>
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

export default PrescriptionsPanel;
