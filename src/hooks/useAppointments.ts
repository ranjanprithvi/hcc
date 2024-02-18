import { Appointment, AppointmentsQuery } from "../models/appointment";
import useData from "./generic/useData";

const useAppointments = (query?: AppointmentsQuery, deps?: any[]) => {
    const {
        data: appointments,
        setData: setAppointments,
        error,
        setError,
        isLoading,
    } = useData<Appointment>("/appointments", query, deps);
    return { appointments, setAppointments, error, setError, isLoading };
};

export default useAppointments;
