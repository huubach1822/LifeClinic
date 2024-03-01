create database datn_database;
use datn_database;

create table account_type (
	ID int auto_increment primary key,
    Name TINYTEXT
);

create table account (
	ID int auto_increment primary key,
    Username TINYTEXT,
    Password TINYTEXT,
    ID_account_type int,
    FOREIGN KEY (ID_account_type) REFERENCES account_type(ID)
);

create table blog (
	ID int auto_increment primary key,
    Name TINYTEXT,
    Date TINYTEXT,
    Content LONGTEXT,
    Image blob,	-- img --
    ID_account int,
    FOREIGN KEY (ID_account) REFERENCES account(ID)
);

create table city (
	ID int auto_increment primary key,
    Name tinytext
);

create table clinic (
	ID int auto_increment primary key,
    Name TINYTEXT,
    Short_Description text,
    Description longtext,
    Logo blob, -- img --
	Address tinytext,
    Latitude TINYTEXT,
    Longitude TINYTEXT,
    ID_city int,
    FOREIGN KEY (ID_city) REFERENCES city(ID)
);

create table clinic_image (
	ID int auto_increment primary key,
    Image blob, -- img --
    ID_clinic int,
    FOREIGN KEY (ID_clinic) REFERENCES clinic(ID)
);

create table speciality (
	ID int auto_increment primary key,
    Name TINYTEXT
);

create table degree (
	ID int auto_increment primary key,
    Name TINYTEXT
);

create table doctor (
	ID int primary key,
    Name TINYTEXT,
    DateOfBirth TINYTEXT,
    Phone TINYTEXT,
    Description longtext,
    Price int,
    Avatar blob, -- img --
    Gender TINYTEXT,
	Email TINYTEXT,
    ID_clinic int,
    ID_speciality int,
    ID_degree int,
    FOREIGN KEY (ID) REFERENCES account(ID),
    FOREIGN KEY (ID_clinic) REFERENCES clinic(ID),
    FOREIGN KEY (ID_speciality) REFERENCES speciality(ID),
    FOREIGN KEY (ID_degree) REFERENCES degree(ID)
);

create table healthcare_type (
	ID int auto_increment primary key,
    Name TINYTEXT
);

create table healthcare_package(
	ID int auto_increment primary key,
    Name TINYTEXT,
    Description TINYTEXT,
    Image blob,	-- img --
    Price int,
    ID_clinic int,
    ID_healthcare_type int,
	FOREIGN KEY (ID_clinic) REFERENCES clinic(ID),
    FOREIGN KEY (ID_healthcare_type) REFERENCES healthcare_type(ID)
);

create table patient (
	ID int auto_increment primary key,
    Name TINYTEXT,
    DateOfBirth TINYTEXT,
    Email TINYTEXT,
    Phone TINYTEXT,
--     Avatar blob, -- img --
    Gender TINYTEXT,
	Address TINYTEXT,
	Health_insurance_code TINYTEXT,
	Ethnicity TINYTEXT,
	Citizen_id_number TINYTEXT,
	ID_account int,
    FOREIGN KEY (ID_account) REFERENCES account(ID)
);

create table time_type (
	ID int auto_increment primary key,
    Value TINYTEXT
);

create table schedule (
	ID int auto_increment primary key,
    Current_number int,
    Max_number int,
    Date TINYTEXT,
    ID_doctor int,
    ID_healthcare_package int,
    ID_time_type int,
    FOREIGN KEY (ID_doctor) REFERENCES doctor(ID),
    FOREIGN KEY (ID_healthcare_package) REFERENCES healthcare_package(ID),
    FOREIGN KEY (ID_time_type) REFERENCES time_type(ID)
);

create table booking (
	ID int auto_increment primary key,
    Status TINYTEXT,
    Booking_date TINYTEXT,
    ID_patient int,
    ID_schedule int,
    FOREIGN KEY (ID_patient) REFERENCES patient(ID),
    FOREIGN KEY (ID_schedule) REFERENCES schedule(ID)    
);






