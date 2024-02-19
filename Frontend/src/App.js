import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Routes, Outlet } from "react-router-dom";
import React from "react";
import { ToastContainer } from 'react-toastify';
import HomePage from "./components/HomePage/HomePage";
import LoginRegisterPage from "./components/LoginRegisterPage/LoginRegisterPage";
import MedicalFacility from "./components/MedicalFacility/MedicalFacility";
import HealthcarePackage from "./components/HealthcarePackage/HealthcarePackage";
import Doctor from "./components/Doctor/Doctor";
import BookingPage from "./components/BookingPage/BookingPage"
import BookingClinic from "./components/BookingClinic/BookingClinic";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function UserPage() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<UserPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/medicalFacility" element={<MedicalFacility />} />
          <Route path="/healthcareService" element={<HealthcarePackage />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/doctorDetail/:id" element={<BookingPage />} />
          <Route path="/bookingClinic/:id" element={<BookingClinic />} />
        </Route>

        <Route path="/login" element={<LoginRegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
