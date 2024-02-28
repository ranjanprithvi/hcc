import { FieldValues, Path, useForm } from "react-hook-form";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Flex } from "@aws-amplify/ui-react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import PasswordInput from "./PasswordInput";

export interface Option {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface Field<T> {
    type: "textInput" | "textArea" | "password" | "select" | "slider";
    label: string;
    name: Path<T>;
    inputType?: string;
    pattern?: string;
    options?: Option[];
    // sliderMarks?: SliderMarks[] | number[];
    // sliderMarks?: number[];
    // min?: number;
    // max?: number;
    placeholder?: string;
}

interface Props<T extends FieldValues> {
    resolver?: any;
    fields: Field<T>[];
    heading: string;
    onSubmit: (data: T) => void;
    resetObject?: T;
    resetDependencies?: any[];
    submitButtonLabel?: string;
}

const Form = <T extends FieldValues>({
    fields,
    heading,
    onSubmit,
    resolver,
    resetObject,
    resetDependencies,
    submitButtonLabel,
}: Props<T>) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<T>({
        resolver,
    });

    useEffect(
        () => {
            resetObject && reset(resetObject);
        },
        resetDependencies ? [...resetDependencies] : []
    );

    function renderInput({ label, name, inputType, pattern }: Field<T>) {
        return (
            <FormControl>
                <FormLabel
                    htmlFor={name}
                    marginX={"10px"}
                    marginY={"0"}
                    fontSize={"12px"}
                    fontWeight={"bold"}
                >
                    {label}
                </FormLabel>
                <Input
                    background={"#f6f6f6"}
                    border={"none"}
                    paddingX={"12px"}
                    size={"sm"}
                    fontSize={"14px"}
                    color={"gray.700"}
                    step="any"
                    id={name}
                    type={inputType}
                    pattern={pattern}
                    {...register(name, {
                        valueAsNumber:
                            inputType == "number" || inputType == "tel",
                    })}
                    onWheel={(e) => (e.target as HTMLInputElement).blur()} // Prevents scrolling from skewing number input
                    multiple={inputType == "file"}
                />
            </FormControl>
        );
    }

    function renderPasswordInput({ label, name }: Field<T>) {
        return (
            <FormControl>
                <FormLabel
                    htmlFor={name}
                    marginX={"10px"}
                    marginY={"0"}
                    fontSize={"12px"}
                    fontWeight={"bold"}
                >
                    {label}
                </FormLabel>
                <PasswordInput name={name} />
            </FormControl>
        );
    }

    function renderTextArea({ label, name }: Field<T>) {
        return (
            <FormControl>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Textarea id={name} {...register(name)} />
            </FormControl>
        );
    }

    // function renderNumberInput({ label, name }: Field<T>) {
    //     return (
    //         <>
    //             <FormLabel htmlFor={name}>{label}</FormLabel>
    //             <NumberInput id={name}>
    //                 <NumberInputField
    //                     {...register(name, { valueAsNumber: true })}
    //                 />
    //                 <NumberInputStepper>
    //                     <NumberIncrementStepper />
    //                     <NumberDecrementStepper />
    //                 </NumberInputStepper>
    //             </NumberInput>
    //         </>
    //     );
    // }

    function renderSelect({
        label,
        name,
        options,
        placeholder,
        inputType,
    }: Field<T>) {
        return (
            <FormControl>
                <FormLabel
                    htmlFor={name}
                    marginX={"10px"}
                    marginY={"0"}
                    fontSize={"12px"}
                    fontWeight={"bold"}
                >
                    {label}
                </FormLabel>
                <Select
                    background={"#f6f6f6"}
                    border={"none"}
                    paddingY={"4px"}
                    paddingX={"2px"}
                    size={"sm"}
                    fontSize={"14px"}
                    placeholder={placeholder}
                    {...register(name, {
                        valueAsNumber: inputType == "number",
                    })}
                    id={name}
                >
                    {options?.map((option) => (
                        <option
                            key={option.label + "_" + option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </Select>
            </FormControl>
        );
    }

    // function renderSlider({ label, name, min, max }: Field<T>) {
    //     return (
    //         <FormControl>
    //             <FormLabel htmlFor={name}>{label}</FormLabel>
    //             <Slider
    //                 min={min}
    //                 max={max}
    //                  {...register(name, { valueAsNumber: true})}
    //             >
    //                 <SliderTrack >
    //                     <SliderFilledTrack />
    //                 </SliderTrack>
    //                 <SliderThumb boxSize={5} />
    //             </Slider>
    //         </FormControl>
    //     );
    // }

    // function renderSlider({ label, name, sliderMarks }: Field<T>) {
    //     return (
    //         <FormControl>
    //             <FormLabel htmlFor={name}>{label}</FormLabel>
    //             <Slider>
    //                 {sliderMarks?.map(
    //                     (mark) => (
    //                         // {
    //                         // return typeof mark == "number" ? (
    //                         <SliderMark key={mark} value={mark}>
    //                             {mark}
    //                         </SliderMark>
    //                     )
    //                     // ) : (
    //                     //     <SliderMark key={mark.value} value={mark.value}>
    //                     //         {mark.label || mark.value}
    //                     //     </SliderMark>
    //                     // );
    //                     // }
    //                 )}
    //                 <SliderTrack>
    //                     <SliderFilledTrack />
    //                 </SliderTrack>
    //                 <SliderThumb />
    //             </Slider>
    //         </FormControl>
    //     );
    // }

    function renderField(field: Field<T>) {
        let renderElement: (arg0: Field<T>) => JSX.Element;
        switch (field.type) {
            case "select":
                renderElement = renderSelect;
                break;
            // case "slider":
            //     renderElement = renderSlider;
            //     break;
            // case "numberInput":
            //     renderElement = renderNumberInput;
            //     break;
            case "textArea":
                renderElement = renderTextArea;
                break;
            case "password":
                renderElement = renderPasswordInput;
                break;
            default:
                renderElement = renderInput;
        }

        return (
            <>
                {renderElement(field)}
                <FormErrorMessage>
                    {errors[field.name]?.message?.toString()}
                </FormErrorMessage>
            </>
        );
    }

    // console.log(errors, isValid);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <VStack width={"60%"}>
                    <Heading size={"lg"} marginBottom="5">
                        {heading}
                    </Heading>
                    {fields.map((field) => (
                        <FormControl
                            key={field.name}
                            marginBottom={3}
                            isInvalid={errors[field.name] ? true : false}
                        >
                            {renderField(field)}
                        </FormControl>
                    ))}

                    <HStack marginTop={"10px"}>
                        {/* <Button isDisabled={!isValid} colorScheme="green" type="submit"> */}
                        <Button
                            size={"sm"}
                            borderRadius={"2px"}
                            colorScheme="pink"
                            type="submit"
                            id="submit"
                        >
                            {submitButtonLabel || "Submit"}
                        </Button>
                        <Button
                            size={"sm"}
                            borderRadius={"2px"}
                            onClick={() => navigate(-1)}
                            colorScheme="gray"
                        >
                            Cancel
                        </Button>
                    </HStack>
                </VStack>
            </Flex>
        </form>
    );
};

export default Form;
