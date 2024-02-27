import { Box, Flex } from "@chakra-ui/react";

const Loader = () => {
    return (
        <Flex
            height={"200px"}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <div className="loader" />
        </Flex>
    );
};

export default Loader;
