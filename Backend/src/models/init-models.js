var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _account_type = require("./account_type");
var _blog = require("./blog");
var _booking = require("./booking");
var _clinic = require("./clinic");
var _clinic_image = require("./clinic_image");
var _doctor = require("./doctor");
var _healthcare_package = require("./healthcare_package");
var _healthcare_type = require("./healthcare_type");
var _patient = require("./patient");
var _schedule = require("./schedule");
var _speciality = require("./speciality");
var _time_type = require("./time_type");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var account_type = _account_type(sequelize, DataTypes);
  var blog = _blog(sequelize, DataTypes);
  var booking = _booking(sequelize, DataTypes);
  var clinic = _clinic(sequelize, DataTypes);
  var clinic_image = _clinic_image(sequelize, DataTypes);
  var doctor = _doctor(sequelize, DataTypes);
  var healthcare_package = _healthcare_package(sequelize, DataTypes);
  var healthcare_type = _healthcare_type(sequelize, DataTypes);
  var patient = _patient(sequelize, DataTypes);
  var schedule = _schedule(sequelize, DataTypes);
  var speciality = _speciality(sequelize, DataTypes);
  var time_type = _time_type(sequelize, DataTypes);

  doctor.belongsTo(account, { as: "ID_account", foreignKey: "ID"});
  account.hasOne(doctor, { as: "doctor", foreignKey: "ID"});
  patient.belongsTo(account, { as: "ID_account_account", foreignKey: "ID_account"});
  account.hasMany(patient, { as: "patients", foreignKey: "ID_account"});
  account.belongsTo(account_type, { as: "ID_account_type_account_type", foreignKey: "ID_account_type"});
  account_type.hasMany(account, { as: "accounts", foreignKey: "ID_account_type"});
  clinic_image.belongsTo(clinic, { as: "ID_clinic_clinic", foreignKey: "ID_clinic"});
  clinic.hasMany(clinic_image, { as: "clinic_images", foreignKey: "ID_clinic"});
  doctor.belongsTo(clinic, { as: "ID_clinic_clinic", foreignKey: "ID_clinic"});
  clinic.hasMany(doctor, { as: "doctors", foreignKey: "ID_clinic"});
  healthcare_package.belongsTo(clinic, { as: "ID_clinic_clinic", foreignKey: "ID_clinic"});
  clinic.hasMany(healthcare_package, { as: "healthcare_packages", foreignKey: "ID_clinic"});
  schedule.belongsTo(doctor, { as: "ID_doctor_doctor", foreignKey: "ID_doctor"});
  doctor.hasMany(schedule, { as: "schedules", foreignKey: "ID_doctor"});
  schedule.belongsTo(healthcare_package, { as: "ID_healthcare_package_healthcare_package", foreignKey: "ID_healthcare_package"});
  healthcare_package.hasMany(schedule, { as: "schedules", foreignKey: "ID_healthcare_package"});
  healthcare_package.belongsTo(healthcare_type, { as: "ID_healthcare_type_healthcare_type", foreignKey: "ID_healthcare_type"});
  healthcare_type.hasMany(healthcare_package, { as: "healthcare_packages", foreignKey: "ID_healthcare_type"});
  booking.belongsTo(patient, { as: "ID_patient_patient", foreignKey: "ID_patient"});
  patient.hasMany(booking, { as: "bookings", foreignKey: "ID_patient"});
  booking.belongsTo(schedule, { as: "ID_schedule_schedule", foreignKey: "ID_schedule"});
  schedule.hasMany(booking, { as: "bookings", foreignKey: "ID_schedule"});
  doctor.belongsTo(speciality, { as: "ID_speciality_speciality", foreignKey: "ID_speciality"});
  speciality.hasMany(doctor, { as: "doctors", foreignKey: "ID_speciality"});
  schedule.belongsTo(time_type, { as: "ID_time_type_time_type", foreignKey: "ID_time_type"});
  time_type.hasMany(schedule, { as: "schedules", foreignKey: "ID_time_type"});

  return {
    account,
    account_type,
    blog,
    booking,
    clinic,
    clinic_image,
    doctor,
    healthcare_package,
    healthcare_type,
    patient,
    schedule,
    speciality,
    time_type,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
