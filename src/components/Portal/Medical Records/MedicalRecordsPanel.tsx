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
import { BiFolder } from "react-icons/bi";
import { MedicalRecord } from "../../../models/medicalRecord";
import { BsDownload } from "react-icons/bs";
import moment from "moment";
import { useContext } from "react";
import { ColourPaletteContext } from "../../../contexts/colourPaletteContext";

interface Props {
    medicalRecords: MedicalRecord[];
}

const MedicalRecords = ({ medicalRecords }: Props) => {
    const { primaryColour } = useContext(ColourPaletteContext);

    return (
        <Card
            boxShadow={"0px 0px 10px #b3b3b3"}
            maxWidth={"75vw"}
            marginBottom={"1rem"}
        >
            <CardHeader color={primaryColour}>
                <HStack marginX={"20px"}>
                    <BiFolder size="20px" />
                    <Heading size="md">Medical Records</Heading>
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
