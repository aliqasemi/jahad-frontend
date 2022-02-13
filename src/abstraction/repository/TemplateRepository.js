import {
    setData,
    getJson,
    getArray,
    setFilterQuery
} from "../resource/TemplateResource";
import axios from "axios"

export default class TemplateRepository {
    async index() {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/jahad/templates');
            if (response && response.status === 200) {
                return getArray(response.data.data);
            }
        } catch (e) {
            return e;
        }
    }


    async indexFilter(data) {
        const params = setFilterQuery(data, data.typeMode);
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/jahad/templates-filter', {params})
            if (response && response.status === 200) {
                return response.data.data;
            }
        } catch (e) {
            return e;
        }
    }

    async show(id) {
        let response = await axios.get("http://127.0.0.1:8000/api/jahad/templates/" + id);
        if (response && response.status === 200) {
            return getJson(response.data.data);
        }
    }

    async store(data) {
        try {
            const params = setData(data);
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/templates", params);

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
                "http://127.0.0.1:8000/api/jahad/templates/" + data.id,
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
                "http://127.0.0.1:8000/api/jahad/templates/" + id
            );
            if (response && response.status === 200) {
                return response;
            }
        } catch (e) {
            return e;
        }
    }
}
