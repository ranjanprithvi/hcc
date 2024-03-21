import {
    Button,
    HStack,
    Image,
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
    Text,
} from "@chakra-ui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "/Logo.png";
import AccountDropdown from "../Account/AccountDropdown";
import ProtectedComponent from "../common/ProtectedComponent";
import { getValueByRole } from "../../utilities/getValueByRole";
import colourPalette from "../../utilities/colour-palette";
import { LoginContext } from "../../contexts/loginContext";

interface NavItem {
    label: string;
    path: string;
    colour?: string;
}

const NavBar = () => {
    const { pathname } = useLocation();
    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onClose: onDrawerClose,
    } = useDisclosure();
    const btnRef = useRef(null);

    let navLinks = [] as NavItem[];
    navLinks = [
        { label: "Home", path: "/" },
        {
            label: "Services",
            path: "/facilities",
            colour: colourPalette.secondary,
        },
    ];

    const { props } = useContext(LoginContext);

    return (
        <>
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
            <HStack
                justifyContent={"space-between"}
                alignItems={"center"}
                height={"100%"}
                paddingX={"20px"}
                borderBottom={"1px solid #cecece"}
            >
                <HStack>
                    <Show below="sm">
                        <Button
                            ref={btnRef}
                            onClick={onDrawerOpen}
                            background={"transparent"}
                            height="20px"
                            marginLeft="-5px"
                            padding="0"
                        >
                            <RxHamburgerMenu size="32px"></RxHamburgerMenu>
                        </Button>
                    </Show>
                    <Link to="/">
                        <Image src={logo} height={{ base: "6", md: "8" }} />
                    </Link>
                    <Text fontWeight={"bold"} marginRight="20px">
                        Heart Care Clinic
                    </Text>
                    <Show above="md">
                        <Tabs marginLeft="3" size={"sm"}>
                            <TabList>
                                {navLinks.map((link) => (
                                    <Link to={link.path} key={link.path}>
                                        <Tab
                                            color={
                                                pathname == link.path
                                                    ? link.colour ||
                                                      colourPalette.primary
                                                    : "gray"
                                            }
                                            borderBottom={
                                                pathname == link.path
                                                    ? "2px"
                                                    : "none"
                                            }
                                            // marginLeft={{ md: 7 }}
                                        >
                                            {link.label}
                                        </Tab>
                                    </Link>
                                ))}
                            </TabList>
                        </Tabs>
                    </Show>
                </HStack>
                {/* <ColourModeSwitch marginRight="3" /> */}
                <Show above="md">
                    <ProtectedComponent
                        user={
                            <HStack marginRight={"15px"}>
                                <Button
                                    as={Link}
                                    to={"/portal/appointments"}
                                    size={"sm"}
                                    colorScheme="pink"
                                    backgroundColor={colourPalette.primary}
                                    borderRadius={"50px"}
                                >
                                    {getValueByRole({
                                        user: "User Portal",
                                        hospital: "Admin Dashboard",
                                    })}
                                </Button>
                                <AccountDropdown />
                            </HStack>
                        }
                        defaultComponent={
                            <Button
                                as={NavLink}
                                to="/login"
                                colorScheme="pink"
                                variant="outline"
                                size={"sm"}
                            >
                                Login
                            </Button>
                        }
                    />
                </Show>
            </HStack>
        </>
    );
};

export default NavBar;
