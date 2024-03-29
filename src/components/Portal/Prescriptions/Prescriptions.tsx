import { VStack } from "@chakra-ui/react";
import { Prescription } from "../../../models/prescription";
import PrescriptionsPanel from "./PrescriptionsPanel";
import ExternalPrescriptionsPanel from "./ExternalPrescriptionsPanel";
import { ExternalPrescription } from "../../../models/externalPrescription";
import useExternalPrescriptions from "../../../hooks/useExternalPrescriptions";
import usePrescriptions from "../../../hooks/usePrescriptions";
import { useContext } from "react";
import { ProfileContext } from "../../../contexts/profileContext";

// const mockPrescriptions: Prescription[] = [
//     {
//         _id: "1",
//         profile: "123",
//         doctor: {
//             _id: "1",
//             name: "Dr. Roopa Ravi",
//             hospital: {
//                 _id: "112",
//                 name: "Heart Care Clinic",
//                 doctors: [],
//             },
//             specialization: { _id: "1", name: "Cardiologist" },
//             qualifications: "MBBS, MD",
//             practicingSince: new Date("2010-01-01"),
//         },
//         dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
//         files: [{ name: "asd.jpg", sizeInBytes: 123 }],
//         folderPath: "123",
//     },
//     {
//         _id: "2",
//         profile: "123",
//         doctor: {
//             _id: "1",
//             name: "Dr. Roopa Ravi",
//             hospital: {
//                 _id: "112",
//                 name: "Heart Care Clinic",
//                 doctors: [],
//             },
//             specialization: { _id: "1", name: "Cardiologist" },
//             qualifications: "MBBS, MD",
//             practicingSince: new Date("2010-01-01"),
//         },
//         dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
//         files: [{ name: "asd.jpg", sizeInBytes: 123 }],
//         folderPath: "123",
//     },
//     {
//         _id: "3",
//         profile: "123",
//         doctor: {
//             _id: "1",
//             name: "Dr. Roopa Ravi",
//             hospital: {
//                 _id: "112",
//                 name: "Heart Care Clinic",
//                 doctors: ["1"],
//             },
//             specialization: { _id: "1", name: "Cardiology" },
//             qualifications: "MBBS, MD",
//             practicingSince: new Date("2010-01-01"),
//         },
//         dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
//         files: [{ name: "asd.jpg", sizeInBytes: 123 }],
//         folderPath: "123",
//     },
// ];

const mockExternalPrescriptions: ExternalPrescription[] = [
    {
        _id: "1",
        profile: "123",
        doctor: "Dr Suess",
        hospital: "Suess Hospital",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "2",
        profile: "123",
        doctor: "Dr. Shashi Tharoor",
        hospital: "Shashi Tharoor Hospital",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
    {
        _id: "3",
        profile: "123",
        doctor: "Dr. APJ Abdul Kalam",
        hospital: "APJ Abdul Kalam Hospital",
        specialization: { _id: "1", name: "Cardiology" },
        dateOnDocument: new Date("2024-04-01T10:00:00.000Z"),
        files: [{ name: "asd.jpg", sizeInBytes: 123 }],
        folderPath: "123",
    },
];
const Prescriptions = () => {
    const { profileId } = useContext(ProfileContext);
    const {
        prescriptions,
        isLoading: prescriptionsLoading,
        error: prescriptionsError,
    } = usePrescriptions({
        profile: profileId || "",
    });
    const {
        externalPrescriptions,
        isLoading: externalPrescriptionsLoading,
        error: externalPrescriptionsError,
    } = useExternalPrescriptions({
        profile: profileId || "",
    });
    return (
        <>
            <PrescriptionsPanel
                prescriptions={prescriptions}
                isLoading={prescriptionsLoading}
                error={prescriptionsError}
            />
            <ExternalPrescriptionsPanel
                externalPrescriptions={externalPrescriptions}
                isLoading={externalPrescriptionsLoading}
                error={externalPrescriptionsError}
            />
        </>
    );
};

export default Prescriptions;
