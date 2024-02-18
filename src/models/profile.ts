import { MedicalRecord } from "./medicalRecord";
import { Account } from "./account";
import { Appointment } from "./appointment";
import { Prescription } from "./prescription";
import { ExternalRecord } from "./externalRecord";
import { ExternalPrescription } from "./externalPrescription";

export interface Profile {
    _id: string;
    account: Account | string;
    name: string;
    gender: string;
    dob: Date;
    phone?: string;
    appointments: Appointment[] | string[];
    medicalRecords: MedicalRecord[] | string[];
    prescriptions: Prescription[] | string[];
    externalRecords: ExternalRecord[] | string[];
    externalPrescriptions: ExternalPrescription[] | string[];
}

export interface ProfileQuery {}
export interface ProfileOverviewQuery {
    patientId: string;
}
