import {
    Button,
    Divider,
    GridItem,
    HStack,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    VStack,
    useDisclosure,
    Text,
} from "@chakra-ui/react";
import Table from "../common/Table";
import useUsers from "../../hooks/useProfiles";
import _ from "lodash";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaEye, FaPen, FaPlus, FaUser } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import { User } from "../../models/user";
import { useState } from "react";
import Modal from "../common/Modal";
import AccordionTable, { AccordionRowData } from "../common/Accordion";
import { TbTrash } from "react-icons/tb";

interface Props {
    dataView?: string;
}

const Users = ({ dataView }: Props) => {
    const { users, isLoading, error } = useUsers({ accessLevel: false });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userToDelete, setUserToDelete] = useState<User>({} as User);

    if (error) {
        return <div>{error}</div>;
    }

    const usersData = users.map((user) => ({
        _id: user._id,
        rowData: {
            name: {
                renderComponent: () => (
                    <HStack>
                        <FaUser />
                        <Link to={`/userDetails/${user._id}`}>
                            <u>{user.name}</u>
                        </Link>
                    </HStack>
                ),
            },
            // name: { value: user.name },
            email: { value: user.email },
            // dateReturned: {
            //     value: moment(user.dateReturned).format("DD MMM YYYY"),
            // },
            membershipExpiry: {
                value: moment(user.membershipExpiry).format("DD MMM YYYY"),
            },
            actions: {
                renderComponent: () => (
                    <HStack>
                        {/* <Button
                            leftIcon={<FaPen />}
                            as={Link}
                            to={`/users/${user._id}}`}
                        >
                            Edit
                        </Button> */}
                        {/* <Menu>
                            <MenuButton
                                as={Button}
                                type="button"
                                rightIcon={<BsChevronDown />}
                                background={"transparent"}
                            ></MenuButton>
                            <MenuList>
                                <MenuItem as={Link} to={`/users/${user._id}`}>
                                    Edit
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setUserToDelete(user);
                                        onOpen();
                                    }}
                                >
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </Menu> */}
                        <Button
                            leftIcon={<TbTrash></TbTrash>}
                            colorScheme="red"
                            onClick={() => {
                                setUserToDelete(user);
                                onOpen();
                            }}
                        >
                            Delete
                        </Button>
                    </HStack>
                ),
            },
        },
    }));

    return (
        <GridItem
            colSpan={2}
            maxWidth="1240px"
            marginX="auto"
            paddingX="5"
            width="100%"
        >
            <Modal
                header="Delete User"
                body="This functionality has been disabled for the demo."
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <>
                        {/* <Button
                            colorScheme="teal"
                            mr="3"
                            onClick={() => handleDelete(userToDelete, toast)}
                        >
                            Yes
                        </Button> */}
                        <Button colorScheme="teal" onClick={onClose}>
                            Ok
                        </Button>
                    </>
                )}
            ></Modal>
            <VStack
                border="2px"
                borderColor="gray.400"
                borderRadius={20}
                padding={10}
                width="100%"
            >
                <HStack
                    justifyContent="space-between"
                    width="100%"
                    paddingX="5"
                    marginBottom={5}
                >
                    <Heading>Users</Heading>
                    <Button
                        as={Link}
                        to="/users/new"
                        leftIcon={<FaPlus />}
                        colorScheme="green"
                    >
                        New User
                    </Button>
                </HStack>
                <Divider />

                {dataView === "table" && (
                    <Table
                        headers={["Name", "Email", "Membership Expiry", ""]}
                        data={usersData}
                        fontSize="sm"
                        isLoading={isLoading}
                    ></Table>
                )}
                {dataView === "accordion" && (
                    <AccordionTable
                        width="100%"
                        border="1px"
                        borderColor="gray.100"
                        data={users.map<AccordionRowData>((user) => ({
                            mainContent: user.name,
                            subContent: (
                                <VStack alignItems="start">
                                    <Text fontWeight={"bold"}>Email:</Text>
                                    <Text>{user.email}</Text>
                                    <Text fontWeight={"bold"}>
                                        Membership Expiry:
                                    </Text>
                                    <Text>
                                        {moment(user.membershipExpiry).format(
                                            "DD MMM YYYY"
                                        )}
                                    </Text>
                                    <Text fontWeight={"bold"}>Phone:</Text>
                                    <Text>{`+${user.countryCode} ${user.phoneNumber}`}</Text>
                                    <Text fontWeight={"bold"}>Book Limit:</Text>
                                    <Text>{user.maxBorrow}</Text>
                                    <HStack
                                        justifyContent="space-between"
                                        width="100%"
                                    >
                                        <Button
                                            as={Link}
                                            to={`/users/${user._id}`}
                                            colorScheme="facebook"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setUserToDelete(user);
                                                onOpen();
                                            }}
                                            colorScheme="red"
                                        >
                                            Delete
                                        </Button>
                                    </HStack>
                                </VStack>
                            ),
                        }))}
                    />
                )}
            </VStack>
        </GridItem>
    );
};

export default Users;
