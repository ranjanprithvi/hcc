import { Box, Flex, GridItem, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import logo from "/Logo.png";

const AuthLanding = () => {
    return (
        <GridItem colSpan={2} width={"100vw"} height={"100vh"} padding={"10px"}>
            <HStack
                position={"absolute"}
                top={0}
                left={0}
                marginLeft={"50px"}
                marginTop={"50px"}
            >
                <Image src={logo} height={{ base: "8", md: "10" }} />
                <Text fontWeight={"bold"} fontSize={"sm"}>
                    Heart Care Clinic
                </Text>
            </HStack>

            <Flex
                alignItems={"center"}
                justifyContent={"center"}
                height={"100%"}
                width={"100%"}
                backgroundImage={"/LoginBackground.png"}
                backgroundPosition={"bottom left"}
                backgroundSize={"cover"}
            >
                <Box
                    maxWidth={"500px"}
                    height={"70%"}
                    width={"100%"}
                    background={"white"}
                    borderRadius={"5px"}
                    boxShadow={"0px 0px 10px #b3b3b3"}
                >
                    <Outlet />
                </Box>
            </Flex>
        </GridItem>
    );
};

export default AuthLanding;
