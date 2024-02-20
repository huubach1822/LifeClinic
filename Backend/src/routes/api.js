import express from "express";
import userController from "../controller/userController";
import clinicController from "../controller/clinicController";
import healthcareController from "../controller/healthcareController";
import doctorsController from "../controller/doctorController";
import bookingController from "../controller/bookingController";

const router = express.Router();

const initApiRoutes = (app) => {

    router.post("/register", userController.register);
    router.post("/login", userController.login);
    router.get("/getAllClinics", clinicController.getAllClinics);
    router.get("/getAllHealthcarePackage", healthcareController.getAllHealthcarePackage);
    router.get("/getAlldoctors", doctorsController.getAllDoctors);
    router.get("/getDoctorDetail/:id", doctorsController.getDoctorDetail);
    router.post("/getDoctorScheduleByDate", doctorsController.getDoctorScheduleByDate);
    router.post("/updateBooking", bookingController.updateBooking);
    router.get("/getDoctorByClinic/:id", doctorsController.getDoctorByClinic);
    router.get("/getAllClinicsPagination/page=:page&queryString=:queryString?&idCity=:idCity?", clinicController.getAllClinicsPagination);

    return app.use("/", router);
}

export default initApiRoutes;