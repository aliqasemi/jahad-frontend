import {setAuthToken, setAuthUser} from "@/service/AuthService";
import {
    getArray, getJson,
    setFilterQuery,
    setQuery, setData
} from "../resource/AuthenticationResource";

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

    async confirmRegister(userId) {
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/confirm-register/" + userId);
            if (response && response.status === 201) {
                return response.data;
            }
        } catch (e) {
            return Promise.reject(e.response.data.errors);
        }
    }

    async verifyRegister(formData, userId) {
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/verify-register/" + userId, formData);
            if (response && response.status === 201) {
                return response.data;
            }
        } catch (e) {
            return Promise.reject(e.data.errors);
        }
    }

    async confirmForgotPassword(formData) {
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/forgot-password", formData);
            if (response && response.status === 201) {
                return response.data;
            }
        } catch (e) {
            return Promise.reject(e.data.errors);
        }
    }

    async verifyForgotPassword(formData) {
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/verify-forgot-password", formData);
            if (response && response.status === 201) {
                return response.data;
            }
        } catch (e) {
            return Promise.reject(e.data.errors);
        }
    }

    async resetPassword(formData) {
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/change-password", formData);
            if (response && response.status === 201) {
                return response.data;
            }
        } catch (e) {
            return Promise.reject(e.data.errors);
        }
    }

    async assignRole(role, userId) {
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/assign-role/" + userId, {ability: role});
            if (response && response.status === 200) {
                return response.data.data;
            }
        } catch (e) {
            return Promise.reject(e.data.errors);
        }
    }

    async index(data) {
        let params = setFilterQuery(data.filter, data.filter.typeMode);
        Object.assign(params, setQuery(data));
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/jahad/users', {params})
            if (response && response.status === 200) {
                return getArray(response.data);
            }
        } catch (e) {
            return e;
        }
    }

    async active(data, userId) {
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/jahad/active/' + userId, {active: data});
            if (response && response.status === 200) {
                return getJson(response.data.data);
            }
        } catch (e) {
            return e;
        }
    }

    async update(data, userId) {
        try {
            const params = setData(data, true);
            let response = await axios.post('http://127.0.0.1:8000/api/jahad/user/' + userId, params);
            if (response && response.status === 200) {
                return getJson(response.data.data);
            }
        } catch (e) {
            return e;
        }
    }

    async show(userId) {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/jahad/user/' + userId);
            if (response && response.status === 200) {
                return getJson(response.data.data);
            }
        } catch (e) {
            return e;
        }
    }
}
