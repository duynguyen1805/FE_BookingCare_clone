import axios from "../axios";

const handleLoginAPI = (userEmail, userPassword) => {
  //goi den server NodeJS
  //truyền key object, đặt tên khác >>> error
  return axios.post("/api/login", { email: userEmail, password: userPassword }); //phai co formdata
};

const getAllUser = (inputId) => {
  //id === "ALL" or id_user
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const CreateNewUserServiceAPI = (data) => {
  // console.log("check data input createuser API: ", data);
  return axios.post("/api/create-new-user", data);
};

const DeleteUserServiceAPI = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const DeleteScheduleServiceAPI = (scheduleId) => {
  return axios.delete("/api/delete-schedule", {
    data: {
      id: scheduleId,
    },
  });
};

const EditUserServiceAPI = (dataEdit) => {
  return axios.put("/api/edit-user", dataEdit);
};

const getAllCodeService = (inputtype) => {
  return axios.get(`/api/allcode?type=${inputtype}`);
};

const getTopDoctorHomeServiceAPI = (limit) => {
  return axios.get(`/api/top-doctor-homepage?limit=${limit}`);
};

const getAllDoctorServiceAPI = () => {
  return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorServiceAPI = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};

const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctorServiceAPI = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getMoreInforDoctorById = (doctorId, date) => {
  return axios.get(`/api/get-more-infor-doctor-by-id?doctorId=${doctorId}`);
};

const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialtyServiceAPI = () => {
  return axios.get(`/api/get-all-specialty`);
};

const getProfileDoctorByIdServiceAPI = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const postSendRemedy = (data) => {
  return axios.post(`/api/confirm-arrived`, data);
};

const getAllSchedule = (inputId) => {
  //id === "ALL" or id_user
  return axios.get(`/api/get-all-schedule?id=${inputId}`);
};

export {
  handleLoginAPI,
  getAllUser,
  CreateNewUserServiceAPI,
  DeleteUserServiceAPI,
  EditUserServiceAPI,
  getAllCodeService,
  getTopDoctorHomeServiceAPI,
  getAllDoctorServiceAPI,
  saveDetailDoctorServiceAPI,
  getDetailInforDoctor,
  saveBulkScheduleDoctorServiceAPI,
  getScheduleDoctorByDate,
  getMoreInforDoctorById,
  createNewSpecialty,
  getAllSpecialtyServiceAPI,
  getProfileDoctorByIdServiceAPI,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  getAllDetailSpecialtyById,
  getAllPatientForDoctor,
  postSendRemedy,
  getAllSchedule,
  DeleteScheduleServiceAPI,
};
