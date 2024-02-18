import {
    Card,
    CardHeader,
    Heading,
    CardBody,
    HStack,
    Button,
    Divider,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { BiFolder, BiNotepad } from "react-icons/bi";
import { BsDownload } from "react-icons/bs";
import moment from "moment";
import { Prescription } from "../../../models/prescription";
import { Doctor } from "../../../models/doctor";
import { Hospital } from "../../../models/hospital";
import { PiNote } from "react-icons/pi";
import { useContext } from "react";
import { ColourPaletteContext } from "../../../contexts/colourPaletteContext";
import PrescriptionsPanel from "./PrescriptionsPanel";

const mockPrescriptions: Prescription[] = [
    {
        _id: "1",
        profile: "123",
        doctor: {
            _id: "1",
            name: "Dr. Roopa Ravi",
            hospital: {
                _id: "112",
                name: "Heart Care Clinic",
                doctors: [],
            },
            specialization: { _id: "1", name: "Cardiologist" },
            qualifications: "MBBS, MD",
            practicingSince: new Date("2010-01-01"),
        },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "2",
        profile: "123",
        doctor: {
            _id: "1",
            name: "Dr. Roopa Ravi",
            hospital: {
                _id: "112",
                name: "Heart Care Clinic",
                doctors: [],
            },
            specialization: { _id: "1", name: "Cardiologist" },
            qualifications: "MBBS, MD",
            practicingSince: new Date("2010-01-01"),
        },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "3",
        profile: "123",
        doctor: {
            _id: "1",
            name: "Dr. Roopa Ravi",
            hospital: {
                _id: "112",
                name: "Heart Care Clinic",
                doctors: ["1"],
            },
            specialization: { _id: "1", name: "Cardiology" },
            qualifications: "MBBS, MD",
            practicingSince: new Date("2010-01-01"),
        },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
];

const Prescriptions = () => {
    return <PrescriptionsPanel prescriptions={mockPrescriptions} />;
};

export default Prescriptions;
