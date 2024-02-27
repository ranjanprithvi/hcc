import { Doctor } from "./doctor";
import { Profile } from "./profile";

export interface Appointment {
    _id: string;
    timeSlot: Date;
    doctor: Doctor | string;
    profile?: Profile | string;
    cancelled?: boolean;
}

export interface AppointmentsQuery {
    date: Date;
    doctorId: string;
}

export interface MyAppointmentsQuery {
    profileId: string;
}

export interface BookAppointmentData {
    profileId: string;
}

export interface RescheduleAppointmentData {
    newAppointmentId: string;
}
