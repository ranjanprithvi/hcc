import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom";
import NotFound from "./components/common/NotFound";
import LoginForm from "./components/Account/LoginForm";
import Home from "./components/Landing/Home";
import Facilities from "./components/Landing/Facilities";
import UserAppointments from "./components/Portal/Appointments/UserAppointments";
import ExternalRecords from "./components/Portal/Medical Records/ExternalRecords";
import Profiles from "./components/Portal/Profiles/Profiles";
import UserPrescriptions from "./components/Portal/Prescriptions/UserPrescriptions";
import HospitalProfiles from "./components/Portal/Profiles/HospitalProfiles";
import { HospitalAppointments } from "./components/Portal/Appointments/HospitalAppointments";
import { Landing } from "./components/Landing/Landing";
import { PortalLanding } from "./components/Portal/PortalLanding";
import Records from "./components/Portal/Medical Records/UserRecords";
import CreateSlots from "./components/Portal/Appointments/CreateSlots";
import ProtectedHospitalComponent from "./components/common/ProtectedHospitalComponent";
import UserBookAppointment from "./components/Portal/Appointments/UserBookAppointment";
import ProfileForm from "./components/Portal/Profiles/ProfileForm";
import { HospitalProfileOverview } from "./components/Portal/Profiles/HospitalProfileOverview";

const Routes = () => {
    return (
        <ReactRoutes>
            <Route path="/" element={<Landing />}>
                <Route path="/" element={<Home />} />
                <Route path="/facilities" element={<Facilities />} />
            </Route>
            <Route path="/portal" element={<PortalLanding />}>
                <Route path="profiles/:id" element={<ProfileForm />} />

                <Route
                    path="user/appointments"
                    element={<UserAppointments />}
                />
                <Route
                    path="user/appointments/book"
                    element={<UserBookAppointment />}
                />
                <Route path="user/records" element={<Records />} />
                <Route
                    path="user/externalRecords"
                    element={<ExternalRecords />}
                />
                <Route path="user/profiles" element={<Profiles />} />
                <Route
                    path="user/prescriptions"
                    element={<UserPrescriptions />}
                />
                <Route
                    path="hospital/appointments"
                    element={
                        <ProtectedHospitalComponent nonHospitalRedirect="/portal/user/appointments">
                            <HospitalAppointments />
                        </ProtectedHospitalComponent>
                    }
                />
                <Route
                    path="hospital/appointments/create"
                    element={<CreateSlots />}
                />
                <Route
                    path="hospital/profiles"
                    element={<HospitalProfiles />}
                />
                <Route
                    path="hospital/profiles/:id"
                    element={<HospitalProfileOverview />}
                />
            </Route>
            <Route path="/users" element={<></>} />

            <Route path="/login" element={<LoginForm />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
        </ReactRoutes>
    );
};

export default Routes;
