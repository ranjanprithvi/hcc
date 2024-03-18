import { Box, Text, Tooltip } from "@chakra-ui/react";

interface Props {
    text: string;
    length: number;
    [key: string]: any;
}

const TruncatedText = ({ text, length, ...props }: Props) => {
    return (
        <Tooltip label={text.length > length ? text : ""}>
            {text.length > length ? (
                <Text {...props}>{text.slice(0, length)}...</Text>
            ) : (
                <Text {...props}>{text}</Text>
            )}
        </Tooltip>
    );
};

export default TruncatedText;
