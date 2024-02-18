import React, { useContext } from "react";
import { TbLogout } from "react-icons/tb";
import { BsChevronDown } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import {
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    useDisclosure,
    MenuDivider,
    MenuGroup,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { LoginContext } from "../../contexts/loginContext";
import Modal from "../common/Modal";
import useProfiles from "../../hooks/useProfiles";
import { roles } from "../../App";
import { RiUser3Fill } from "react-icons/ri";
import { ColourPaletteContext } from "../../contexts/colourPaletteContext";
import useDoctors from "../../hooks/useDoctors";
import { getCurrentDoctorId, logout } from "../../services/helper-service";
import RenderByRole from "../common/RenderByRole";

const UserProfiles = () => {
    const { primaryColour } = useContext(ColourPaletteContext);

    const { profiles, error, isLoading } = useProfiles();

    return (
        <>
            <MenuGroup title="Profiles">
                {profiles.map((profile) => (
                    <MenuItem
                        color={
                            profile._id == getCurrentDoctorId()
                                ? primaryColour
                                : "gray.800"
                        }
                        icon={<RiUser3Fill />}
                    >
                        {profile.name}
                    </MenuItem>
                ))}
            </MenuGroup>

            <MenuDivider />
        </>
    );
};

const HospitalDoctors = () => {
    const { primaryColour } = useContext(ColourPaletteContext);

    const { doctors, error, isLoading } = useDoctors();

    return (
        <>
            <MenuGroup title="Doctors">
                {doctors.map((d) => (
                    <MenuItem
                        color={
                            d._id == getCurrentDoctorId()
                                ? primaryColour
                                : "gray.800"
                        }
                        icon={<RiUser3Fill />}
                    >
                        {d.name}
                    </MenuItem>
                ))}
            </MenuGroup>

            <MenuDivider />
        </>
    );
};

const AccountDropdown = () => {
    const { isLoggedIn, setLoggedIn, accessLevel, setAccessLevel } =
        useContext(LoginContext);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return isLoggedIn ? (
        <>
            <Modal
                header="Logout"
                body="Are you sure you want to logout?"
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <>
                        <Button colorScheme="pink" mr={3} onClick={logout}>
                            Yes
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )}
            />
            <Menu>
                <MenuButton
                    size={"sm"}
                    as={Button}
                    leftIcon={<BiSolidUserCircle />}
                    rightIcon={<BsChevronDown />}
                >
                    Account
                </MenuButton>
                <MenuList>
                    <RenderByRole
                        items={[
                            {
                                accessLevel: roles.user,
                                component: <UserProfiles />,
                            },
                            {
                                accessLevel: roles.hospital,
                                component: <></>,
                            },
                        ]}
                    ></RenderByRole>

                    <MenuItem icon={<TbLogout />} onClick={onOpen}>
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    ) : (
        <Button
            as={NavLink}
            to="/login"
            colorScheme="pink"
            variant="outline"
            size={"sm"}
        >
            Login
        </Button>
    );
};

export default AccountDropdown;
