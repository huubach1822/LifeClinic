var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _account_type = require("./account_type");
var _blog = require("./blog");
var _booking = require("./booking");
var _city = require("./city");
var _clinic = require("./clinic");
var _clinic_image = require("./clinic_image");
var _degree = require("./degree");
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
  var city = _city(sequelize, DataTypes);
  var clinic = _clinic(sequelize, DataTypes);
  var clinic_image = _clinic_image(sequelize, DataTypes);
  var degree = _degree(sequelize, DataTypes);
  var doctor = _doctor(sequelize, DataTypes);
  var healthcare_package = _healthcare_package(sequelize, DataTypes);
  var healthcare_type = _healthcare_type(sequelize, DataTypes);
  var patient = _patient(sequelize, DataTypes);
  var schedule = _schedule(sequelize, DataTypes);
  var speciality = _speciality(sequelize, DataTypes);
  var time_type = _time_type(sequelize, DataTypes);

  blog.belongsTo(account, { foreignKey: "ID_account"});
  account.hasMany(blog, { foreignKey: "ID_account"});
  doctor.belongsTo(account, { foreignKey: "ID"});
  account.hasOne(doctor, { foreignKey: "ID"});
  patient.belongsTo(account, { foreignKey: "ID_account"});
  account.hasMany(patient, { foreignKey: "ID_account"});
  account.belongsTo(account_type, { foreignKey: "ID_account_type"});
  account_type.hasMany(account, { foreignKey: "ID_account_type"});
  clinic.belongsTo(city, { foreignKey: "ID_city"});
  city.hasMany(clinic, { foreignKey: "ID_city"});
  clinic_image.belongsTo(clinic, { foreignKey: "ID_clinic"});
  clinic.hasMany(clinic_image, { foreignKey: "ID_clinic"});
  doctor.belongsTo(clinic, { foreignKey: "ID_clinic"});
  clinic.hasMany(doctor, { foreignKey: "ID_clinic"});
  healthcare_package.belongsTo(clinic, { foreignKey: "ID_clinic"});
  clinic.hasMany(healthcare_package, { foreignKey: "ID_clinic"});
  doctor.belongsTo(degree, { foreignKey: "ID_degree"});
  degree.hasMany(doctor, { foreignKey: "ID_degree"});
  schedule.belongsTo(doctor, { foreignKey: "ID_doctor"});
  doctor.hasMany(schedule, { foreignKey: "ID_doctor"});
  schedule.belongsTo(healthcare_package, { foreignKey: "ID_healthcare_package"});
  healthcare_package.hasMany(schedule, { foreignKey: "ID_healthcare_package"});
  healthcare_package.belongsTo(healthcare_type, { foreignKey: "ID_healthcare_type"});
  healthcare_type.hasMany(healthcare_package, { foreignKey: "ID_healthcare_type"});
  booking.belongsTo(patient, { foreignKey: "ID_patient"});
  patient.hasMany(booking, { foreignKey: "ID_patient"});
  booking.belongsTo(schedule, { foreignKey: "ID_schedule"});
  schedule.hasMany(booking, { foreignKey: "ID_schedule"});
  doctor.belongsTo(speciality, { foreignKey: "ID_speciality"});
  speciality.hasMany(doctor, { foreignKey: "ID_speciality"});
  schedule.belongsTo(time_type, { foreignKey: "ID_time_type"});
  time_type.hasMany(schedule, { foreignKey: "ID_time_type"});

  return {
    account,
    account_type,
    blog,
    booking,
    city,
    clinic,
    clinic_image,
    degree,
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
