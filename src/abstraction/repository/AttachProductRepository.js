import {
    getArray, setData
} from "../resource/AttachProductResource";
import axios from "axios"

export default class AttachProductRepository {
    async indexRequireProduct(projectId) {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/jahad/project/' + projectId + '/require-products');
            return getArray(response.data.data)
        } catch (e) {
            return e;
        }
    }

    async attachProduct(data, requireProductId) {
        try {
            let params = setData(data);
            let response = await axios.post('http://127.0.0.1:8000/api/jahad/attach-product/' + requireProductId, params);
            return response.data.data;
        } catch (e) {
            return Promise.reject(e.response.data);
        }
    }

    async deleteRequireProductProduct(requireProductProductId) {
        try {
            let response = await axios.delete(
                "http://127.0.0.1:8000/api/jahad/require-product-products/" + requireProductProductId
            );
            if (response && response.status === 200) {
                return response;
            }
        } catch (e) {
            return e;
        }
    }
}
