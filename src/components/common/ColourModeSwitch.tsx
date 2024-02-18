import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColourModeSwitch = ({ ...rest }) => {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <HStack {...rest}>
            <Switch
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
                colorScheme="pink"
                data-testid="toggler"
            />

            <Text>Dark Mode</Text>
        </HStack>
    );
};

export default ColourModeSwitch;
