import {
    ArrayPath,
    FieldArray,
    FieldValues,
    Path,
    useFieldArray,
    useForm,
} from "react-hook-form";
import {
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Heading,
    IconButton,
    Input,
    Select,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { BiMinus, BiMinusCircle, BiPlus, BiPlusCircle } from "react-icons/bi";
import InputWithSearch from "../../common/InputWithSearch";
import useMedications from "../../../hooks/useMedications";

export interface Option {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface Field<T> {
    type?: "textInput" | "textArea" | "password" | "select" | "slider";
    label: string;
    name: Path<T>;
    inputType?: string;
    pattern?: string;
    options?: Option[];
    height?: string;
    minHeight?: string;
    // sliderMarks?: SliderMarks[] | number[];
    // sliderMarks?: number[];
    // min?: number;
    // max?: number;
    placeholder?: string;
    acceptFileTypes?: string;
    render?: () => JSX.Element;
}

interface Props<T extends FieldValues> {
    resolver?: any;
    fields: Field<T>[];
    heading: string;
    onSubmit: (data: T) => void;
    resetObject?: T;
    resetDependencies?: any[];
    submitButtonLabel?: string;
    // formProps?:any
}

const GridForm = <T extends FieldValues>({
    fields,
    onSubmit,
    resolver,
    resetObject,
    resetDependencies,
    submitButtonLabel,
}: // formProps,
Props<T>) => {
    const navigate = useNavigate();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<T>({
        // ...formProps,
        resolver,
    });

    const {
        fields: arrayFields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "medications" as ArrayPath<T>,
    });

    useEffect(
        () => {
            resetObject && reset(resetObject);
        },
        resetDependencies ? [...resetDependencies] : []
    );

    function renderInput({
        label,
        name,
        inputType,
        pattern,
        acceptFileTypes,
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
                    accept={inputType == "file" ? acceptFileTypes : ""}
                />
            </FormControl>
        );
    }

    function renderTextArea({ label, name, minHeight }: Field<T>) {
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
                <Textarea id={name} {...register(name)} minHeight={minHeight} />
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

    function renderField(field?: Field<T>) {
        if (field == undefined) return <></>;

        let renderElement: (arg0: Field<T>) => JSX.Element;
        switch (field.type) {
            case "select":
                renderElement = renderSelect;
                break;
            case "textArea":
                renderElement = renderTextArea;
                break;
            default:
                renderElement = renderInput;
        }

        return (
            <FormControl
                key={field.name}
                marginBottom={3}
                isInvalid={errors[field.name] ? true : false}
            >
                {field.render ? field.render() : renderElement(field)}
                <FormErrorMessage>
                    {errors[field.name]?.message?.toString()}
                </FormErrorMessage>
            </FormControl>
        );
    }

    const [search, setSearch] = useState("");
    const { medications } = useMedications(
        {
            search: search,
        },
        [search]
    );

    // const inputRef = useRef<HTMLInputElement>(null);

    // const setRefValue = (value: string, index: number) => {
    //     const { ref } = register(`medications.${index}.name` as Path<T>);
    //     ref.value = value;
    // };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
                width={"100%"}
                columnGap={"30px"}
                templateAreas={`"dateOnDocument medications" 
                "content medications"
                "existingFiles medications"
                "files medications"
                "footer medications"`}
                templateColumns={"auto 350px"}
            >
                {fields.map((field) => (
                    <GridItem area={field.name}>{renderField(field)}</GridItem>
                ))}
                <GridItem area={"medications"}>
                    <Flex direction={"column"} alignItems={"flex-end"}>
                        {arrayFields.map((field, index) => (
                            <HStack
                                key={field.id}
                                marginBottom={"10px"}
                                borderBottom={"1px dotted #a1a1a1"}
                                paddingBottom={"10px"}
                            >
                                <VStack>
                                    {/* <InputWithSearch
                                        options={medications.map((m) => {
                                            return {
                                                label: m.name,
                                                value: m.name,
                                            };
                                        })}
                                        setRefValue={setRefValue}
                                        onTextChange={setSearch}
                                        size={"xs"}
                                        placeholder="Name"
                                        {...register(
                                            `medications.${index}.name` as Path<T>
                                        )}
                                    ></InputWithSearch> */}
                                    <Input
                                        size={"xs"}
                                        {...register(
                                            `medications.${index}.name` as Path<T>
                                        )}
                                        placeholder="Name"
                                    ></Input>
                                    <HStack>
                                        <Input
                                            size={"xs"}
                                            {...register(
                                                `medications.${index}.dosage` as Path<T>
                                            )}
                                            placeholder="Dosage"
                                        />
                                        <Input
                                            size={"xs"}
                                            {...register(
                                                `medications.${index}.interval` as Path<T>
                                            )}
                                            placeholder="Interval"
                                        />
                                        <Input
                                            size={"xs"}
                                            {...register(
                                                `medications.${index}.quantity` as Path<T>
                                            )}
                                            placeholder="Quantity"
                                        />
                                    </HStack>
                                    <Input
                                        size={"xs"}
                                        {...register(
                                            `medications.${index}.instructions` as Path<T>
                                        )}
                                        placeholder="Instructions"
                                    ></Input>
                                </VStack>
                                <IconButton
                                    size={"xs"}
                                    icon={<BiMinus size={"20px"} />}
                                    aria-label="Remove Medication"
                                    onClick={() => remove(index)}
                                    variant={"outline"}
                                    colorScheme="pink"
                                ></IconButton>
                            </HStack>
                        ))}
                        <Button
                            size={"xs"}
                            leftIcon={<BiPlus size={"20px"} />}
                            variant={"outline"}
                            colorScheme="pink"
                            onClick={() =>
                                append({} as FieldArray<T, ArrayPath<T>>)
                            }
                        >
                            Add Medication
                        </Button>
                    </Flex>
                </GridItem>

                <GridItem marginTop={"10px"} area={"footer"} marginX={"auto"}>
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
                </GridItem>
            </Grid>
        </form>
    );
};

export default GridForm;
