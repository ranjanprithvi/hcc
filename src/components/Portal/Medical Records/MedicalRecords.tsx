import { useContext } from "react";
import useExternalRecords from "../../../hooks/useExternalRecords";
import useMedicalRecords from "../../../hooks/useMedicalRecords";
import { ExternalRecord } from "../../../models/externalRecord";
import { MedicalRecord } from "../../../models/medicalRecord";
import ExternalRecordsPanel from "./ExternalRecordsPanel";
import MedicalRecordsPanel from "./MedicalRecordsPanel";
import { AccountContext } from "../../../contexts/profileContext";
import { getProfileId } from "../../../utilities/helper-service";

const mockRecords: MedicalRecord[] = [
    {
        _id: "1",
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
        recordName: "ECG_Report_20012022.jpeg",
    },
    {
        _id: "2",
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
        recordName: "ECG_Report_20012023",
    },
    {
        _id: "3",
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
        recordName: "ECG_Report_20012024",
    },
    {
        _id: "1",
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
        recordName: "ECG_Report_20012022",
    },
    {
        _id: "2",
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
        recordName: "ECG_Report_20012023",
    },
    {
        _id: "3",
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
        recordName: "ECG_Report_20012024",
    },
];

const mockExternalRecords: ExternalRecord[] = [
    {
        _id: "1",
        doctor: "Dr Suess",
        hospital: "Suess Hospital",
        profile: "123",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        recordName: "ECG_Report_20012022",
    },
    {
        _id: "2",
        doctor: "Dr. Shashi Tharoor",
        hospital: "Shashi Tharoor Hospital",
        profile: "123",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        recordName: "ECG_Report_20012024",
    },
    {
        _id: "3",
        doctor: "Dr. APJ Abdul Kalam",
        hospital: "APJ Abdul Kalam Hospital",
        profile: "123",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        recordName: "ECG_Report_20012023",
    },

    {
        _id: "1",
        doctor: "Dr Suess",
        hospital: "Suess Hospital",
        profile: "123",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        recordName: "ECG_Report_20012022",
    },
    {
        _id: "2",
        doctor: "Dr. Shashi Tharoor",
        hospital: "Shashi Tharoor Hospital",
        profile: "123",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        recordName: "ECG_Report_20012024",
    },
    {
        _id: "3",
        doctor: "Dr. APJ Abdul Kalam",
        hospital: "APJ Abdul Kalam Hospital",
        profile: "123",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        recordType: "ECG",
        recordName: "ECG_Report_20012023",
    },
];

const Records = () => {
    // const { profileId } = useContext(AccountContext);
    const {
        medicalRecords,
        error: mrError,
        isLoading: mrLoading,
    } = useMedicalRecords({
        profile: getProfileId(),
    });
    const {
        externalRecords,
        error: erError,
        isLoading: erLoading,
    } = useExternalRecords({
        profile: getProfileId(),
    });
    return (
        <>
            <MedicalRecordsPanel
                medicalRecords={medicalRecords}
                error={mrError}
                isLoading={mrLoading}
            />
            <ExternalRecordsPanel
                externalRecords={externalRecords}
                error={erError}
                isLoading={erLoading}
            />
        </>
    );
};

export default Records;
