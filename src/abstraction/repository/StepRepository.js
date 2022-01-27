import {
    setData,
    getJson,
    getArray,
} from "../resource/StepResource";
import axios from "axios"

export default class StepRepository {
    async index(data) {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/jahad/steps');
            if (response && response.status === 200) {
                return getArray(response.data);
            }
        } catch (e) {
            return e;
        }
    }

    async show(id) {
        let response = await axios.get("http://127.0.0.1:8000/api/jahad/steps/" + id);
        if (response && response.status === 200) {
            return getJson(response.data.data);
        }
    }

    async store(data) {
        try {
            const params = setData(data);
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/steps", params);

            if (response && response.status === 201) {
                return getJson(response.data.data);
            }
        } catch (e) {
            return Promise.reject(e.response.data.errors);
        }
    }

    async update(data) {
        try {
            const params = setData(data, true);

            let response = await axios.post(
                "http://127.0.0.1:8000/api/jahad/steps/" + data.id,
                params
            );

            if (response && response.status === 200) {
                return getJson(response.data.data);
            }
        } catch (e) {
            return Promise.reject(e.response.data.errors);
        }
    }

    async destroy(id) {
        try {
            let response = await axios.delete(
                "http://127.0.0.1:8000/api/jahad/steps/" + id
            );
            if (response && response.status === 200) {
                return response;
            }
        } catch (e) {
            return e;
        }
    }

    async moveUp(id) {
        try {
            let response = await axios.post(
                "steps/move-up/" + id
            );
            if (response && response.status === 200) {

                return response;
            }
        } catch (e) {
            return e;
        }
    }

    async moveDown(id) {
        try {
            let response = await axios.post(
                "steps/move-down/" + id
            );
            if (response && response.status === 200) {
                return response;
            }
        } catch (e) {
            return e;
        }
    }
}
