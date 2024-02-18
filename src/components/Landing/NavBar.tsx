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
import { Link, useLocation } from "react-router-dom";
import { useContext, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "/Logo.png";
import { ColourPaletteContext } from "../../contexts/colourPaletteContext";
import AccountDropdown from "../Account/AccountDropdown";

interface NavItem {
    label: string;
    path: string;
}

const NavBar = () => {
    const { primaryColour } = useContext(ColourPaletteContext);

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
        { label: "Services", path: "/facilities" },
    ];

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
            <HStack justifyContent="space-between" padding={"4"}>
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
                                                    ? primaryColour
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
                <HStack marginRight={"15px"}>
                    {/* <ColourModeSwitch marginRight="3" /> */}
                    <Show above="md">
                        <AccountDropdown />
                    </Show>
                </HStack>
            </HStack>
        </>
    );
};

export default NavBar;
