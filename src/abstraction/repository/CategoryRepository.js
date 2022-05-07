import {
    setData,
    getJson,
    getArray,
} from "../resource/CategoryResource";
import axios from "axios"
import basic_url from "@/router/url";

export default class CategoryRepository {
    async index() {
        try {
            let response = await axios.get(basic_url + 'categories');
            if (response && response.status === 200) {
                return getArray(response.data.data);
            }
        } catch (e) {
            return e;
        }
    }

    async show(id) {
        let response = await axios.put(basic_url + "categories/" + id);
        if (response && response.status === 200) {
            return getJson(response.data.data);
        }
    }

    async store(data) {
        try {
            const params = setData(data);
            let response = await axios.post(basic_url + "categories", params);

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
                basic_url + "categories/" + data.id,
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
                basic_url + "categories/" + id
            );
            if (response && response.status === 200) {
                return true;
            }
        } catch (e) {
            return e;
        }

    }
}
