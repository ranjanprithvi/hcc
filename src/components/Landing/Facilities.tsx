import { Heading, Text, Image, VStack, HStack, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { ColourPaletteContext } from "../../contexts/colourPaletteContext";

function Facilities() {
    const { primaryColour, secondaryBgColour } =
        useContext(ColourPaletteContext);
    return (
        <Flex flexDirection="column" width={"100vw"}>
            <HStack
                flexDirection={{ base: "column", md: "row" }}
                background={secondaryBgColour}
                padding="20px"
            >
                <Image
                    src="/diagnostics.png"
                    alt="An ECG machine"
                    width="500px"
                />
                <VStack paddingLeft={{ base: 0, md: "20px" }}>
                    <Heading alignSelf="flex-start" color={primaryColour}>
                        Diagnostics
                    </Heading>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laborum dolores aut culpa nesciunt corporis minus
                    </Text>
                </VStack>
            </HStack>

            <HStack
                flexDirection={{ base: "column", md: "row-reverse" }}
                padding="20px"
                alignItems="center"
            >
                <Image
                    src="/pathology.png"
                    alt="An ECG machine"
                    width="500px"
                />

                <VStack paddingRight={{ base: 0, md: "20px" }}>
                    <Heading alignSelf="flex-start" color={primaryColour}>
                        Pathology
                    </Heading>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laborum dolores aut culpa nesciunt corporis minus
                    </Text>{" "}
                </VStack>
            </HStack>

            <HStack
                flexDirection={{ base: "column", md: "row" }}
                background={secondaryBgColour}
                padding="20px"
                alignItems="center"
            >
                <Image src="/preventive.jpg" width="500px" />
                <VStack paddingLeft={{ base: 0, md: "20px" }}>
                    {" "}
                    <Heading alignSelf="flex-start" color={primaryColour}>
                        Preventive Medicine
                    </Heading>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laborum dolores aut culpa nesciunt corporis minus
                    </Text>{" "}
                </VStack>
            </HStack>

            <HStack
                flexDirection={{ base: "column", md: "row-reverse" }}
                padding="20px"
                alignItems="center"
            >
                <Image src="/risk.png" width="500px" />
                <VStack paddingRight={{ base: 0, md: "20px" }}>
                    <Heading alignSelf="flex-start" color={primaryColour}>
                        Risk Assessment
                    </Heading>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laborum dolores aut culpa nesciunt corporis minus
                    </Text>
                </VStack>{" "}
            </HStack>
        </Flex>
    );
}

export default Facilities;
