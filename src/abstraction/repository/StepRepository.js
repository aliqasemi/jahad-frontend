import {
    setData,
    getJson,
    getArray,
} from "../resource/StepResource";
import axios from "axios"
import basic_url from "@/router/url";

export default class StepRepository {
    async index(project_id) {
        try {
            let response = await axios.get(basic_url + 'project/' + project_id + '/steps');
            if (response && response.status === 200) {
                return getArray(response.data.data);
            }
        } catch (e) {
            return e;
        }
    }

    async show(id) {
        let response = await axios.get(basic_url + 'steps/' + id);
        if (response && response.status === 200) {
            return getJson(response.data.data);
        }
    }

    async store(data) {
        try {
            const params = setData(data);
            let response = await axios.post(basic_url + 'project/' + data.project_id + '/steps', params);

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
                basic_url + 'steps/' + data.id,
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
                basic_url + 'steps/' + id
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
                basic_url + "steps/move-up/" + id
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
                basic_url + "steps/move-down/" + id
            );
            if (response && response.status === 200) {
                return response;
            }
        } catch (e) {
            return e;
        }
    }
}
