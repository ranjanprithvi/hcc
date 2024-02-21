import { VStack } from "@chakra-ui/react";
import useProfileOverview from "../../../hooks/useProfileOverview";
import { useParams } from "react-router-dom";
import AppointmentsPanel from "../Appointments/AppointmentsPanel";
import { Appointment } from "../../../models/appointment";
import PrescriptionsPanel from "../Prescriptions/PrescriptionsPanel";
import { Prescription } from "../../../models/prescription";
import ExternalPrescriptionsPanel from "../Prescriptions/ExternalPrescriptionsPanel";
import { ExternalPrescription } from "../../../models/externalPrescription";
import ExternalRecordsPanel from "../Medical Records/ExternalRecordsPanel";
import { ExternalRecord } from "../../../models/externalRecord";
import MedicalRecordsPanel from "../Medical Records/MedicalRecordsPanel";
import { MedicalRecord } from "../../../models/medicalRecord";

export const ProfileOverview = () => {
    const { id } = useParams();
    const {
        appointments,
        medicalRecords,
        externalRecords,
        prescriptions,
        externalPrescriptions,
        error,
        isLoading,
    } = useProfileOverview(id || "");

    console.log(appointments);

    return (
        <VStack alignItems={"stretch"}>
            <AppointmentsPanel
                appointments={appointments as Appointment[]}
                error={error}
            ></AppointmentsPanel>
            <MedicalRecordsPanel
                medicalRecords={medicalRecords as MedicalRecord[]}
            ></MedicalRecordsPanel>
            <ExternalRecordsPanel
                externalRecords={externalRecords as ExternalRecord[]}
            ></ExternalRecordsPanel>
            <PrescriptionsPanel
                prescriptions={prescriptions as Prescription[]}
            ></PrescriptionsPanel>
            <ExternalPrescriptionsPanel
                externalPrescriptions={
                    externalPrescriptions as ExternalPrescription[]
                }
            ></ExternalPrescriptionsPanel>
        </VStack>
    );
};
