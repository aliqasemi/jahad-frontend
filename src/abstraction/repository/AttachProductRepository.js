import {
    getArray, setData
} from "../resource/AttachProductResource";
import axios from "axios"
import basic_url from "@/router/url";

export default class AttachProductRepository {
    async indexRequireProduct(projectId) {
        try {
            let response = await axios.get(basic_url + 'project/' + projectId + '/require-products');
            return getArray(response.data.data)
        } catch (e) {
            return e;
        }
    }

    async attachProduct(data, requireProductId) {
        try {
            let params = setData(data);
            let response = await axios.post(basic_url + 'attach-product/' + requireProductId, params);
            return response.data.data;
        } catch (e) {
            return Promise.reject(e.response.data);
        }
    }

    async deleteRequireProductProduct(requireProductProductId) {
        try {
            let response = await axios.delete(
                basic_url + "require-product-products/" + requireProductProductId
            );
            if (response && response.status === 200) {
                return response;
            }
        } catch (e) {
            return e;
        }
    }
}
