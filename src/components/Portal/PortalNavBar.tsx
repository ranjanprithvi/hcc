import {
    Button,
    HStack,
    Image,
    Link as ChakraLink,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    Show,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Tabs,
    Tab,
    TabList,
    VStack,
    Text,
    Box,
    Heading,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useContext, useRef } from "react";
import { LoginContext } from "../../contexts/loginContext";
import { TbLogout } from "react-icons/tb";
import { BsChevronDown } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import Modal from "../common/Modal";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "/Logo.png";
import { ColourPaletteContext } from "../../contexts/colourPaletteContext";
import AccountDropdown from "../Account/AccountDropdown";

interface NavItem {
    label: string;
    path: string;
}

interface Props {
    heading: string;
}

const PortalNavBar = ({ heading }: Props) => {
    const { primaryColour } = useContext(ColourPaletteContext);

    const { pathname } = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onClose: onDrawerClose,
    } = useDisclosure();
    const btnRef = useRef(null);

    const { isLoggedIn, setLoggedIn, accessLevel, setAccessLevel } =
        useContext(LoginContext);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("accessLevel");
        setLoggedIn(false);
        setAccessLevel(0);
    };

    return (
        <HStack borderBottom={"1px solid #cecece"} justifyContent={"flex-end"}>
            <Modal
                header="Logout"
                body="Are you sure you want to logout?"
                onClose={onClose}
                isOpen={isOpen}
                renderFooter={() => (
                    <>
                        <Button
                            colorScheme="pink"
                            backgroundColor={primaryColour}
                            mr={3}
                            onClick={() => {
                                logout();
                                window.location.assign("/");
                            }}
                        >
                            Yes
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )}
            />
            <Drawer
                isOpen={isDrawerOpen}
                placement="top"
                onClose={onDrawerClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent width="150vw">
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder="Type here..." />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            variant="outline"
                            mr={3}
                            onClick={onDrawerClose}
                        >
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Box padding={"10px"}>
                <AccountDropdown />
            </Box>
        </HStack>
    );
};

export default PortalNavBar;
