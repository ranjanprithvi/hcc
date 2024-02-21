import { Heading, Text, Image, VStack, HStack, Flex } from "@chakra-ui/react";
import colourPalette from "../../utilities/colour-palette";

function Facilities() {
    return (
        <Flex flexDirection="column" width={"100vw"}>
            <HStack
                flexDirection={{ base: "column", md: "row" }}
                background={colourPalette.secondaryBg}
                padding="20px"
            >
                <Image
                    src="/diagnostics.png"
                    alt="An ECG machine"
                    width="500px"
                />
                <VStack paddingLeft={{ base: 0, md: "20px" }}>
                    <Heading
                        alignSelf="flex-start"
                        color={colourPalette.secondary}
                    >
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
                    <Heading
                        alignSelf="flex-start"
                        color={colourPalette.secondary}
                    >
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
                background={colourPalette.secondaryBg}
                padding="20px"
                alignItems="center"
            >
                <Image src="/preventive.jpg" width="500px" />
                <VStack paddingLeft={{ base: 0, md: "20px" }}>
                    {" "}
                    <Heading
                        alignSelf="flex-start"
                        color={colourPalette.secondary}
                    >
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
                    <Heading
                        alignSelf="flex-start"
                        color={colourPalette.secondary}
                    >
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
