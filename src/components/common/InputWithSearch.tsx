import { forwardRef, useState, useRef, useEffect } from "react";
import _ from "lodash";
import {
    Input,
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import { ChangeHandler } from "react-hook-form";

interface Props {
    name: string;
    options: { value: any; label: string }[];
    // value: string;
    onChange: ChangeHandler;
    onTextChange: (value: string) => void;
    // setRefValue: (value: string) => void;
    [key: string]: any;
}

const InputWithSearch = forwardRef<HTMLInputElement, Props>(
    (
        { name, options, value, onChange, onTextChange, setRefValue, ...props },
        ref
    ) => {
        // const isSearchActive = useRef(false);
        const [isOpen, setIsOpen] = useState(false);
        const [inputValue, setInputValue] = useState("");

        // useEffect((value: string) => {
        //     function fetchValues() {
        //         if (value) {
        //             onChange(_.find(options, { value }).label);
        //         }
        //     }
        //     fetchValues();
        // });

        const handleTextChange = (text: string) => {
            // onChange(text);
            onTextChange(text);
            setIsOpen(options.length > 0);
        };

        return (
            <Popover isOpen={isOpen} autoFocus={false} matchWidth>
                <PopoverTrigger>
                    <Input
                        name={name}
                        type={"text"}
                        value={inputValue}
                        autoComplete="off"
                        onChange={(e) => {
                            handleTextChange(e.target.value);
                            setInputValue(e.target.value);
                        }}
                        id={"dropdownId"}
                        ref={ref}
                        {...props}
                    />
                </PopoverTrigger>
                <PopoverContent>
                    {options?.map((option, index) => (
                        <Option
                            key={option.value}
                            i={index}
                            {...option}
                            // onChange={onChange}
                        />
                    ))}
                </PopoverContent>
            </Popover>
        );

        function Option({
            label,
            i,
        }: // onChange,
        {
            label: string;
            i: number;
            // onChange: (text: string) => void;
        }) {
            function updateText() {
                // onChange(options[i].label);
                // inputRef.current!.value = label;
                // (ref as HTMLInputElement)
                // setRefValue(label);
                setInputValue(label);
                setIsOpen(false);
            }

            return (
                <Box
                    onClick={() => updateText()}
                    p={1}
                    _hover={{ bgColor: "gray.50" }}
                >
                    <Text cursor={"pointer"}>{label}</Text>
                </Box>
            );
        }
    }
);
export default InputWithSearch;
