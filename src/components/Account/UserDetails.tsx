import {
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
    HStack,
    Heading,
    Spinner,
    Text,
    Tooltip,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import useUser from "../../hooks/useProfile";
import moment from "moment";
import Table, { TableData } from "../common/Table";
import { FaPlus } from "react-icons/fa";
import { AiOutlineRollback } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { useContext, useState } from "react";
import { LoginContext } from "../../contexts/loginContext";
import Modal from "../common/Modal";
import { Rental } from "../../models/hospital";

const UserDetails = () => {
    const { id } = useParams();
    const toast = useToast();
    const { accessLevel } = useContext(LoginContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [rentalToReturn, setRentalToReturn] = useState<Rental>({} as Rental);

    if (!id) return null;

    const { user, isLoading, error } = useUser(id);

    if (error) return <Text>User Not Found!</Text>;
    if (isLoading) return <Spinner />;

    const tableData: TableData[] = user?.activeRentals?.map((rental) => {
        return accessLevel
            ? {
                  _id: rental._id,
                  rowData: {
                      book: { value: rental.book?.title },
                      dateOut: {
                          value: moment(
                              parseInt(rental._id.substring(0, 8), 16) * 1000
                          ).format("DD MMM YYYY"),
                      },
                      dateReturned: {
                          renderComponent: function () {
                              return rental.dateReturned ? (
                                  <div>
                                      {moment(rental.dateReturned).format(
                                          "DD MMM YYYY"
                                      )}
                                  </div>
                              ) : (
                                  <>
                                      <Button
                                          leftIcon={<AiOutlineRollback />}
                                          colorScheme="pink"
                                          size={"sm"}
                                          alignItems={"center"}
                                          onClick={() => {
                                              setRentalToReturn(rental);
                                              onOpen();
                                          }}
                                      >
                                          Mark as Returned
                                      </Button>
                                  </>
                              );
                          },
                      },
                  },
              }
            : {
                  _id: rental._id,
                  rowData: {
                      book: { value: rental.book?.title },
                      dateOut: {
                          value: moment(
                              parseInt(rental._id.substring(0, 8), 16) * 1000
                          ).format("DD MMM YYYY"),
                      },
                  },
              };
    });

    return (
        <GridItem colSpan={2} marginBottom={5} maxWidth="1280px" marginX="auto">
            <Modal
                header="Return"
                body="Are you sure you want to mark the book as returned?"
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <>
                        <Button colorScheme="pink" mr="3" onClick={() => {}}>
                            Yes
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )}
            ></Modal>
            <Box
                marginX={"5"}
                borderColor={"blue.800"}
                borderWidth={"medium"}
                borderRadius={"xl"}
            >
                <Grid
                    minWidth={{ sm: "0", md: "600px" }}
                    width={"100%"}
                    templateRows="100px repeat(5,50px) auto"
                    rowGap={2}
                    padding={{ base: 5, md: 10 }}
                >
                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            height="100%"
                        >
                            <Flex alignItems="center" height="100%">
                                <Heading size="2xl">{user.name}</Heading>
                            </Flex>

                            {accessLevel && (
                                <Button
                                    as={Link}
                                    to={`/users/${id}`}
                                    leftIcon={<BsPencilSquare />}
                                    colorScheme="facebook"
                                    marginTop={5}
                                >
                                    Edit
                                </Button>
                            )}
                        </Flex>
                    </GridItem>

                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            height="100%"
                            alignItems={{ base: "start", md: "center" }}
                            flexDirection={{ base: "column", md: "row" }}
                        >
                            <Text fontWeight="bold">Email </Text>{" "}
                            <Text>{user?.email}</Text>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            height="100%"
                            alignItems={{ base: "start", md: "center" }}
                            flexDirection={{ base: "column", md: "row" }}
                        >
                            <Text fontWeight="bold">Phone Number</Text>{" "}
                            <Text>
                                {user.countryCode +
                                    " " +
                                    (user?.phoneNumber
                                        ? user?.phoneNumber.toString()
                                        : "")}
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            height="100%"
                            alignItems={{ base: "start", md: "center" }}
                            flexDirection={{ base: "column", md: "row" }}
                        >
                            <Text fontWeight="bold">Date of Birth: </Text>{" "}
                            <Text>
                                {moment(user.dateOfBirth).format("DD MMM YYYY")}
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            height="100%"
                            alignItems={{ base: "start", md: "center" }}
                            flexDirection={{ base: "column", md: "row" }}
                        >
                            <Text fontWeight="bold">Membership Expiry: </Text>{" "}
                            {user?.membershipExpiry && (
                                <Text
                                    color={
                                        new Date(user.membershipExpiry) <
                                        new Date()
                                            ? "red"
                                            : "green"
                                    }
                                >
                                    {moment(user.membershipExpiry).format(
                                        "DD MMM YYYY"
                                    )}
                                </Text>
                            )}
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Divider />
                        <Flex
                            justifyContent="space-between"
                            height="100%"
                            alignItems={{ base: "start", md: "center" }}
                            flexDirection={{ base: "column", md: "row" }}
                        >
                            <Text fontWeight="bold">Book Limit: </Text>{" "}
                            <Text>{user.maxBorrow}</Text>
                        </Flex>
                    </GridItem>

                    <Divider />
                    <GridItem marginTop={10} border="blue.100">
                        <HStack justifyContent="space-between">
                            <Heading size={"lg"}>Active Rentals</Heading>

                            {accessLevel && (
                                <Tooltip
                                    label={
                                        user.activeRentals?.length >=
                                        user.maxBorrow
                                            ? "Book Limit Reached"
                                            : user.membershipExpiry &&
                                              new Date(user.membershipExpiry) <
                                                  new Date()
                                            ? "Membership Expired"
                                            : ""
                                    }
                                >
                                    {/* <Link
                                    to={`/rentals/new?user=${user._id}`}
                                    isDisabled={
                                        user.activeRentals?.length >=
                                        user.maxBorrow
                                    }
                                > */}
                                    <Button
                                        size="sm"
                                        as={Link}
                                        to={`/rentals/new?user=${user._id}`}
                                        onClick={(event) => {
                                            if (
                                                user.activeRentals?.length >=
                                                    user.maxBorrow ||
                                                (user.membershipExpiry &&
                                                    new Date(
                                                        user.membershipExpiry
                                                    ) < new Date())
                                            )
                                                event.preventDefault();
                                        }}
                                        colorScheme="green"
                                        leftIcon={<FaPlus />}
                                        isDisabled={
                                            user.activeRentals?.length >=
                                                user.maxBorrow ||
                                            (user.membershipExpiry &&
                                                new Date(
                                                    user.membershipExpiry
                                                ) < new Date())
                                        }
                                    >
                                        New Rental
                                    </Button>
                                    {/* </Link> */}
                                </Tooltip>
                            )}
                        </HStack>
                        <Divider marginY="2" />

                        {tableData?.length > 0 ? (
                            <Table
                                data={tableData}
                                headers={["Book", "Date Out", ""]}
                                isLoading={isLoading}
                                fontSize="sm"
                            ></Table>
                        ) : (
                            <Text>There are currently no active rentals</Text>
                        )}
                    </GridItem>
                </Grid>
            </Box>
        </GridItem>
    );
};

export default UserDetails;
