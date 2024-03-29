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
import { ProfileContext } from "../../../contexts/profileContext";
import { useContext, useEffect } from "react";

export const ProfileOverview = () => {
    const { id } = useParams();
    const {
        identityId,
        appointments,
        medicalRecords,
        externalRecords,
        prescriptions,
        externalPrescriptions,
        error,
        isLoading,
    } = useProfileOverview(id || "");

    const { setIdentityId, setProfileId } = useContext(ProfileContext);

    useEffect(() => {
        setIdentityId(identityId);
        setProfileId(id || "");
    }, [identityId]);

    return (
        <VStack alignItems={"stretch"}>
            <AppointmentsPanel
                appointments={appointments as Appointment[]}
                error={error}
                isLoading={isLoading}
            ></AppointmentsPanel>
            <MedicalRecordsPanel
                medicalRecords={medicalRecords as MedicalRecord[]}
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
