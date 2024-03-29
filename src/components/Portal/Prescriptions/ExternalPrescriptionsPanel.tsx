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
    IconButton,
    useDisclosure,
    VStack,
    Box,
    Text,
} from "@chakra-ui/react";
import moment from "moment";
import { BiPlusMedical, BiUpload } from "react-icons/bi";
import {
    FaEdit,
    FaDownload,
    FaTrash,
    FaTrashAlt,
    FaPen,
    FaEye,
} from "react-icons/fa";
import { PiNoteBlank } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ExternalPrescription } from "../../../models/externalPrescription";
import colourPalette from "../../../utilities/colour-palette";
import ProtectedComponent from "../../common/ProtectedComponent";
import {
    deleteFolderFromS3,
    handleDelete,
    handleViewRecord,
} from "../../../utilities/record-manager-service";
import Loader from "../../common/Loader";
import GalleryModal from "../GalleryModal";
import { useState } from "react";
import { Account } from "../../../models/account";
import { Profile } from "../../../models/profile";

interface Props {
    externalPrescriptions: ExternalPrescription[];
    identityId: string;
    error: string;
    isLoading: boolean;
}

const ExternalPrescriptionsPanel = ({
    externalPrescriptions,
    identityId,
    error,
    isLoading,
}: Props) => {
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPrescription, setSelectedPrescription] = useState({
        path: "",
        header: "",
        leftPanel: <></>,
    });

    return (
        <>
            {isOpen && (
                <GalleryModal
                    path={selectedPrescription.path}
                    isOpen={isOpen}
                    onClose={onClose}
                    header={selectedPrescription.header}
                    leftPanel={selectedPrescription.leftPanel}
                ></GalleryModal>
            )}
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
                                                    <Tooltip label="View">
                                                        <IconButton
                                                            icon={<FaEye />}
                                                            aria-label="Download Record"
                                                            size={"xs"}
                                                            colorScheme="orange"
                                                            variant={"outline"}
                                                            // as={Link}
                                                            // to={
                                                            //     "/gallery/" +
                                                            //     p.profile +
                                                            //     "%2FexternalPrescriptions%2F" +
                                                            //     p._id
                                                            // }
                                                            onClick={() => {
                                                                setSelectedPrescription(
                                                                    {
                                                                        path:
                                                                            (
                                                                                (
                                                                                    p.profile as Profile
                                                                                )
                                                                                    .account as Account
                                                                            )
                                                                                .identityId +
                                                                            "/" +
                                                                            p.profile +
                                                                            "/externalPrescriptions/" +
                                                                            p._id,
                                                                        header:
                                                                            "External Prescription - " +
                                                                            moment(
                                                                                p.dateOnDocument
                                                                            ).format(
                                                                                "DD/MM/yyyy"
                                                                            ),
                                                                        leftPanel:
                                                                            (
                                                                                <VStack
                                                                                    alignItems={
                                                                                        "flex-start"
                                                                                    }
                                                                                    padding={
                                                                                        "20px 20px 0 0"
                                                                                    }
                                                                                >
                                                                                    <Box
                                                                                        width={
                                                                                            "100%"
                                                                                        }
                                                                                        borderBottom={
                                                                                            "1px solid #d5d5d5"
                                                                                        }
                                                                                    >
                                                                                        <Heading size="xs">
                                                                                            Doctor
                                                                                        </Heading>
                                                                                        <Text>
                                                                                            {
                                                                                                p.doctor
                                                                                            }
                                                                                        </Text>
                                                                                    </Box>
                                                                                    <Box
                                                                                        borderBottom={
                                                                                            "1px solid #d5d5d5"
                                                                                        }
                                                                                        width={
                                                                                            "100%"
                                                                                        }
                                                                                    >
                                                                                        <Heading size="xs">
                                                                                            Hospital
                                                                                        </Heading>
                                                                                        <Text>
                                                                                            {
                                                                                                p.hospital
                                                                                            }
                                                                                        </Text>
                                                                                    </Box>
                                                                                    <Box>
                                                                                        <Heading size="xs">
                                                                                            Specialization
                                                                                        </Heading>
                                                                                        <Text>
                                                                                            {
                                                                                                p
                                                                                                    .specialization
                                                                                                    .name
                                                                                            }
                                                                                        </Text>
                                                                                    </Box>
                                                                                </VStack>
                                                                            ),
                                                                    }
                                                                );
                                                                onOpen();
                                                            }}
                                                        />
                                                    </Tooltip>
                                                    <ProtectedComponent
                                                        hospital={<></>}
                                                        user={
                                                            <Tooltip label="Edit">
                                                                <IconButton
                                                                    icon={
                                                                        <FaPen />
                                                                    }
                                                                    aria-label="Edit Record"
                                                                    size={"xs"}
                                                                    colorScheme="orange"
                                                                    variant={
                                                                        "outline"
                                                                    }
                                                                    as={Link}
                                                                    to={`/portal/externalPrescriptions/${p._id}`}
                                                                    marginLeft={
                                                                        "5px"
                                                                    }
                                                                />
                                                            </Tooltip>
                                                        }
                                                    ></ProtectedComponent>
                                                    {/* <Tooltip label="Download">
                                                    <IconButton
                                                        icon={<FaDownload />}
                                                        aria-label="Download Record"
                                                        size={"xs"}
                                                        colorScheme="orange"
                                                        variant={"outline"}
                                                        onClick={() => {
                                                            handleViewRecord(
                                                                p.profile +
                                                                    "/externalPrescriptions/" +
                                                                    p._id
                                                            );
                                                        }}
                                                    />
                                                </Tooltip> */}
                                                    <ProtectedComponent
                                                        hospital={<></>}
                                                        user={
                                                            <Tooltip label="Delete">
                                                                <IconButton
                                                                    icon={
                                                                        <FaTrashAlt />
                                                                    }
                                                                    aria-label="Delete Prescription"
                                                                    size={"xs"}
                                                                    colorScheme="orange"
                                                                    onClick={() => {
                                                                        handleDelete(
                                                                            p,
                                                                            "/externalPrescriptions",
                                                                            identityId,
                                                                            toast,
                                                                            () =>
                                                                                window.location.reload()
                                                                        );
                                                                    }}
                                                                    marginLeft={
                                                                        "5px"
                                                                    }
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
        </>
    );
};

export default ExternalPrescriptionsPanel;
