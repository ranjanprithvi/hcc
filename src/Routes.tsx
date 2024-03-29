import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom";
import NotFound from "./components/common/NotFound";
import LoginForm from "./components/Account/LoginForm";
import Home from "./components/Landing/Home";
import Facilities from "./components/Landing/Facilities";
import UserAppointments from "./components/Portal/Appointments/Appointments";
import Profiles from "./components/Portal/Profiles/Profiles";
import Prescriptions from "./components/Portal/Prescriptions/Prescriptions";
import AllProfiles from "./components/Portal/Profiles/AllProfiles";
import { AppointmentsDashboard } from "./components/Portal/Appointments/AppointmentsDashboard";
import { Landing } from "./components/Landing/Landing";
import { PortalLanding } from "./components/Portal/PortalLanding";
import Records from "./components/Portal/Medical Records/MedicalRecords";
import CreateSlots from "./components/Portal/Appointments/CreateSlots";
import BookAppointmentSlot from "./components/Portal/Appointments/BookAppointmentSlot";
import ProfileForm from "./components/Portal/Profiles/ProfileForm";
import { ProfileOverview } from "./components/Portal/Profiles/ProfileOverview";
import ProtectedRoute from "./components/common/ProtectedRoute";
import MedicalRecordForm from "./components/Portal/Medical Records/MedicalRecordForm";
import ExternalRecordForm from "./components/Portal/Medical Records/ExternalRecordForm";
import ExternalPrescriptionForm from "./components/Portal/Prescriptions/ExternalPrescriptionForm";
import PrescriptionForm from "./components/Portal/Prescriptions/PrescriptionForm";
import AssignProfileToSlot from "./components/Portal/Appointments/ChooseProfileForm";
import LinkAccountForm from "./components/Portal/Profiles/LinkAccountForm";
import GalleryModal from "./components/Portal/GalleryModal";
import VerifyEmail from "./components/Account/VerifyEmail";
import AuthLanding from "./components/Account/AuthLanding";
import EnterCode from "./components/Account/EnterCode";

const Routes = () => {
    return (
        <ReactRoutes>
            <Route path="/" element={<Landing />}>
                <Route path="/" element={<Home />} />
                <Route path="/facilities" element={<Facilities />} />
            </Route>
            <Route
                path="/portal"
                element={<ProtectedRoute userRoute={<PortalLanding />} />}
            >
                <Route
                    path="appointments"
                    element={
                        <ProtectedRoute
                            hospitalRoute={<AppointmentsDashboard />}
                            userRoute={<UserAppointments />}
                        ></ProtectedRoute>
                    }
                />
                <Route
                    path="appointments/book/:profileId?"
                    element={
                        <ProtectedRoute
                            userRoute={<BookAppointmentSlot />}
                        ></ProtectedRoute>
                    }
                />
                <Route
                    path="appointments/reschedule/:oldId?"
                    element={
                        <ProtectedRoute
                            userRoute={<BookAppointmentSlot />}
                        ></ProtectedRoute>
                    }
                />
                <Route
                    path="appointments/assignToProfile/:id?"
                    element={
                        <ProtectedRoute
                            userRoute={<AssignProfileToSlot />}
                        ></ProtectedRoute>
                    }
                />
                <Route
                    path="appointments/create"
                    element={
                        <ProtectedRoute
                            hospitalRoute={<CreateSlots />}
                        ></ProtectedRoute>
                    }
                />

                <Route
                    path="records"
                    element={<ProtectedRoute userRoute={<Records />} />}
                />
                <Route
                    path="medicalRecords/:id/:profileId?/:identityId?"
                    element={
                        <ProtectedRoute userRoute={<MedicalRecordForm />} />
                    }
                />
                <Route
                    path="externalRecords/:id"
                    element={
                        <ProtectedRoute userRoute={<ExternalRecordForm />} />
                    }
                />

                <Route
                    path="profiles"
                    element={
                        <ProtectedRoute
                            userRoute={<Profiles />}
                            hospitalRoute={<AllProfiles />}
                        />
                    }
                />
                <Route path="profiles/:id" element={<ProfileForm />} />
                <Route path="profiles/link/:id" element={<LinkAccountForm />} />
                <Route
                    path="profileOverview/:id"
                    element={<ProfileOverview />}
                />

                <Route
                    path="prescriptions"
                    element={<ProtectedRoute userRoute={<Prescriptions />} />}
                />
                <Route
                    path="prescriptions/:id/:profileId?/:identityId?"
                    element={
                        <ProtectedRoute userRoute={<PrescriptionForm />} />
                    }
                />
                <Route
                    path="externalPrescriptions/:id"
                    element={
                        <ProtectedRoute
                            userRoute={<ExternalPrescriptionForm />}
                        />
                    }
                />
            </Route>
            {/* <Route path="/gallery/:path" element={<Gallery />} /> */}
            <Route path="/auth" element={<AuthLanding />}>
                <Route path="login" element={<LoginForm />} />
                <Route path="verifyEmail" element={<VerifyEmail />} />
                <Route path="enterCode/:username" element={<EnterCode />} />
            </Route>
            {/* <Route path="/verifyEmail" element={<VerifyEmail />} /> */}
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
        </ReactRoutes>
    );
};

export default Routes;
