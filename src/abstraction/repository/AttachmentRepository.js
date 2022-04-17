import {
    getArray
} from "../resource/AttachmentResource";
import axios from "axios"
import basic_url from "@/router/url";

export default class AttachmentRepository {
    async indexAttachmentByRequirement(requirementId) {
        try {
            let response = await axios.get(basic_url + 'attach-requirement-service/' + requirementId);
            return getArray(response.data.data)
        } catch (e) {
            return e;
        }
    }

    async indexAttachmentByService(serviceId) {
        try {
            let response = await axios.get(basic_url + 'attach-service-requirement/' + serviceId);
            return getArray(response.data.data)
        } catch (e) {
            return e;
        }
    }
}
