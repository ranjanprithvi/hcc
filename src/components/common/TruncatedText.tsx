import { Box, Tooltip } from "@chakra-ui/react";

interface Props {
    text: string;
}

const TruncatedText = ({ text }: Props) => {
    return (
        <Tooltip label={text.length > 20 ? text : ""}>
            {text.length > 20 ? <>{text.slice(0, 20)}...</> : <>{text}</>}
        </Tooltip>
    );
};

export default TruncatedText;
