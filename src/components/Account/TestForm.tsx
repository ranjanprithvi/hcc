import { Box, GridItem, useToast } from "@chakra-ui/react";
import Form, { Field } from "../common/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";

import { uploadData } from "aws-amplify/storage";
import { log } from "console";

const schema = z.object({
    files: z.any(),
});

type Data = z.infer<typeof schema>;

interface LoginResponse {
    token: string;
}

const TestForm = () => {
    // const navigate = useNavigate();
    // const { showError } = useToast();
    const toast = useToast();

    const resolver = zodResolver(schema);

    const fields: Field<Data>[] = [
        {
            type: "textInput",
            label: "File",
            name: "files",
            inputType: "file",
        },
    ];

    const uploadDataInBrowser = async (data: Data) => {
        // console.log("data", data);
        if (data.files) {
            const file = data.files[0] as File;
            uploadData({
                key: file.name,
                data: file,
            });
        }
    };
    return (
        <GridItem colSpan={2} marginX={5} marginY="auto">
            <Box
                marginX={"auto"}
                marginTop="5%"
                borderColor={"blue.800"}
                borderWidth={"medium"}
                borderRadius={"xl"}
                padding={10}
                maxWidth={"600px"}
            >
                <Form<Data>
                    resolver={resolver}
                    fields={fields}
                    heading={"Test"}
                    onSubmit={uploadDataInBrowser}
                />
            </Box>
        </GridItem>
    );
};

export default TestForm;
