import { ExternalPrescription } from "../../../models/externalPrescription";
import ExternalPrescriptionsPanel from "./ExternalPrescriptionsPanel";

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

const ExternalPrescriptions = () => {
    return (
        <ExternalPrescriptionsPanel
            externalPrescriptions={mockExternalPrescriptions}
        />
    );
};

export default ExternalPrescriptions;
