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

    return (
        <VStack alignItems={"stretch"}>
            <AppointmentsPanel
                appointments={appointments as Appointment[]}
                profileId={id}
                error={error}
                isLoading={isLoading}
            ></AppointmentsPanel>
            <MedicalRecordsPanel
                medicalRecords={medicalRecords as MedicalRecord[]}
                profileId={id}
                error={error}
                isLoading={isLoading}
            ></MedicalRecordsPanel>
            <ExternalRecordsPanel
                externalRecords={externalRecords as ExternalRecord[]}
                error={error}
                isLoading={isLoading}
            ></ExternalRecordsPanel>
            <PrescriptionsPanel
                prescriptions={prescriptions as Prescription[]}
                profileId={id}
                error={error}
                isLoading={isLoading}
            ></PrescriptionsPanel>
            <ExternalPrescriptionsPanel
                externalPrescriptions={
                    externalPrescriptions as ExternalPrescription[]
                }
                error={error}
                isLoading={isLoading}
            ></ExternalPrescriptionsPanel>
        </VStack>
    );
};
