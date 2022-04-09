import {setAuthToken, setAuthUser} from "@/service/AuthService";
import axios from "axios";

export default class AuthenticationRepository {
    async logIn(body) {
        try {
            console.log(body)
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/login", body);
            setAuthToken(response.data.token);
            setAuthUser(response.data.user);
            if (response && response.status === 200) {
                return response.data;
            }
        } catch (e) {
            return e;
        }
    }

    async logOut() {
        try {
            let response = await axios.get("http://127.0.0.1:8000/api/jahad/logout");
            setAuthToken();
            setAuthUser();
            if (response && response.status === 200) {
                return response.data;
            }
        } catch (e) {
            return e;
        }
    }

    async register(formData) {
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/register", formData);
            if (response && response.status === 200) {
                return response.data;
            }
        } catch (e) {
            return Promise.reject(e.response.data.errors);
        }
    }

    async confirmRegister(userId){
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/confirm-register/"+ userId);
            if (response && response.status === 201) {
                return response.data;
            }
        } catch (e) {
            return Promise.reject(e.response.data.errors);
        }
    }

    async verifyRegister(formData, userId){
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/verify-register/"+ userId, formData);
            if (response && response.status === 201) {
                return response.data;
            }
        } catch (e) {
            return Promise.reject(e.data.errors);
        }
    }

    async confirmForgotPassword(formData){
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/forgot-password", formData);
            if (response && response.status === 201) {
                return response.data;
            }
        } catch (e) {
            return Promise.reject(e.data.errors);
        }
    }

    async verifyForgotPassword(formData){
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/verify-forgot-password", formData);
            if (response && response.status === 201) {
                return response.data;
            }
        } catch (e) {
            return Promise.reject(e.data.errors);
        }
    }
}
