import { ExternalRecord } from "../../../models/externalRecord";
import { MedicalRecord } from "../../../models/medicalRecord";
import ExternalRecordsPanel from "./ExternalRecordsPanel";
import MedicalRecordsPanel from "./MedicalRecordsPanel";

const mockRecords: MedicalRecord[] = [
    {
        _id: "1",
        recordName: "ECG_Report_20012022.jpeg",
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
        profile: "123",
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "2",
        recordName: "ECG_Report_20012023.jpeg",
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
        profile: "123",
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "3",
        recordName: "ECG_Report_20012024.jpeg",
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
        profile: "123",
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "1",
        recordName: "ECG_Report_20012022.jpeg",
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
        profile: "123",
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "2",
        recordName: "ECG_Report_20012023.jpeg",
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
        profile: "123",
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "3",
        recordName: "ECG_Report_20012024.jpeg",
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
        profile: "123",
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
];

const mockExternalRecords: ExternalRecord[] = [
    {
        _id: "1",
        recordName: "ECG_Report_20012022.jpeg",
        doctor: "Dr Suess",
        hospital: "Suess Hospital",
        profile: "123",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "2",
        recordName: "ECG_Report_20012024.jpeg",
        doctor: "Dr. Shashi Tharoor",
        hospital: "Shashi Tharoor Hospital",
        profile: "123",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "3",
        recordName: "ECG_Report_20012023.jpeg",
        doctor: "Dr. APJ Abdul Kalam",
        hospital: "APJ Abdul Kalam Hospital",
        profile: "123",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },

    {
        _id: "1",
        recordName: "ECG_Report_20012022.jpeg",
        doctor: "Dr Suess",
        hospital: "Suess Hospital",
        profile: "123",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "2",
        recordName: "ECG_Report_20012024.jpeg",
        doctor: "Dr. Shashi Tharoor",
        hospital: "Shashi Tharoor Hospital",
        profile: "123",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "3",
        recordName: "ECG_Report_20012023.jpeg",
        doctor: "Dr. APJ Abdul Kalam",
        hospital: "APJ Abdul Kalam Hospital",
        profile: "123",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
];

const Records = () => {
    return (
        <>
            <MedicalRecordsPanel medicalRecords={mockRecords} />
            <ExternalRecordsPanel externalRecords={mockExternalRecords} />
        </>
    );
};

export default Records;
