import {
    setData,
    getJson,
    getArray, setQuery, setFilterQuery
} from "../resource/ProjectResource";
import axios from "axios"
import basic_url from "@/router/url";

export default class ProjectRepository {
    async index(data) {
        let params = setFilterQuery(data.filter, data.filter.typeMode);
        Object.assign(params, setQuery(data));
        try {
            let response = await axios.get(basic_url + 'projects', {params});
            if (response && response.status === 200) {
                return getArray(response.data);
            }
        } catch (e) {
            return e;
        }
    }

    async indexFilter(data) {
        const params = setFilterQuery(data, data.typeMode);
        try {
            let response = await axios.get(basic_url + 'projects-filter', {params})
            if (response && response.status === 200) {
                return response.data.data;
            }
        } catch (e) {
            return e;
        }
    }

    async indexUser(data) {
        let params = setFilterQuery(data.filter, data.filter.typeMode);
        Object.assign(params, setQuery(data));
        try {
            let response = await axios.get(basic_url + 'projects-user', {params})
            if (response && response.status === 200) {
                return getArray(response.data);
            }
        } catch (e) {
            return e;
        }
    }

    async show(id) {
        let response = await axios.get(basic_url + "projects/" + id);
        if (response && response.status === 200) {
            return getJson(response.data.data);
        }
    }

    async showUser(id) {
        let response = await axios.get(basic_url + "projects-user/" + id);
        if (response && response.status === 200) {
            return getJson(response.data.data);
        }
    }

    async store(data) {
        try {
            const params = setData(data);
            let response = await axios.post(basic_url + "projects", params);

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
                basic_url + "projects/" + data.id,
                params
            );

            if (response && response.status === 200) {
                return getJson(response.data.data);
            }
        } catch (e) {
            return Promise.reject(e.response.data.errors);
        }
    }

    async changeStep(data) {
        try {
            let response = await axios.post(basic_url + "projects/" + data.project_id + "/change-step", {step_id: data.step_id});
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
                basic_url + "projects/" + id
            );
            if (response && response.status === 200) {
                return response;
            }
        } catch (e) {
            return e;
        }


    }
}
