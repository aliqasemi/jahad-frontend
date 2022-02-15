import {
    setData,
    getJson,
    getArray,
    setQuery,
} from "../resource/ProductResource";
import axios from "axios"

export default class ProductRepository {
    async index(data) {
        const params = setQuery(data);
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/jahad/products', {params});
            if (response && response.status === 200) {
                return getArray(response.data);
            }
        } catch (e) {
            return e;
        }
    }

    async show(id) {
        let response = await axios.get("http://127.0.0.1:8000/api/jahad/products/" + id);
        if (response && response.status === 200) {
            return getJson(response.data.data);
        }
    }

    async store(data) {
        try {
            const params = setData(data);
            let response = await axios.post("http://127.0.0.1:8000/api/jahad/products", params);

            if (response && response.status === 201) {
                return getJson(response.data.data);
            }
        } catch (e) {
            console.log(e)
            return Promise.reject(e.response.data.errors);
        }
    }

    async update(data) {
        try {
            const params = setData(data, true);

            let response = await axios.post(
                "http://127.0.0.1:8000/api/jahad/products/" + data.id,
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
                "http://127.0.0.1:8000/api/jahad/products/" + id
            );
            if (response && response.status === 200) {
                return response;
            }
        } catch (e) {
            return e;
        }
    }
}
