import axios from "../axios"

const handleLoginAPI = (userEmail, userPassword) => {
    //goi den server NodeJS 
    //truyền key object, đặt tên khác >>> error
    return axios.post("/api/login", {email: userEmail, password: userPassword});//phai co formdata
}

const getAllUser = (inputId) => { //id === "ALL" or id_user
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const CreateNewUserServiceAPI = (data) => {
    // console.log("check data input createuser API: ", data);
    return axios.post("/api/create-new-user", data);
}

const DeleteUserServiceAPI = (userId) => {
    return axios.delete("/api/delete-user", 
    {
        data: {
            id: userId
        }
    });
}

const EditUserServiceAPI = (dataEdit) => {
    return axios.put("/api/edit-user", dataEdit);
}

const getAllCodeService = (inputtype) => {
    return axios.get(`/api/allcode?type=${inputtype}`);
}

const getTopDoctorHomeServiceAPI = (limit) => {
    return axios.get(`/api/top-doctor-homepage?limit=${limit}`);
}

export {
    handleLoginAPI,
    getAllUser,
    CreateNewUserServiceAPI,
    DeleteUserServiceAPI,
    EditUserServiceAPI,
    getAllCodeService,
    getTopDoctorHomeServiceAPI
}
