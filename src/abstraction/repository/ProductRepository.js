import {
    setData,
    getJson,
    getArray,
    setQuery,
    setFilterQuery
} from "../resource/ProductResource";
import axios from "axios"
import basic_url from "@/router/url";

export default class ProductRepository {
    async index(data) {
        const params = setQuery(data);
        try {
            let response = await axios.get(basic_url + 'products', {params});
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
            let response = await axios.get(basic_url + 'products-filter', {params})
            if (response && response.status === 200) {
                return response.data.data;
            }
        } catch (e) {
            return e;
        }
    }


    async show(id) {
        let response = await axios.get(basic_url + "products/" + id);
        if (response && response.status === 200) {
            return getJson(response.data.data);
        }
    }

    async store(data) {
        try {
            const params = setData(data);
            let response = await axios.post(basic_url + "products", params);

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
                basic_url + "products/" + data.id,
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
                basic_url + "products/" + id
            );
            if (response && response.status === 200) {
                return response;
            }
        } catch (e) {
            return e;
        }
    }
}
