import {
   getJson
} from "../resource/Mainresource";
import axios from "axios";
import basic_url from "@/router/url";

export default class MainRepository {
    async getInfo() {
        try {
            let response = await axios.get(basic_url + 'chart/info');
            return getJson(response.data);
        } catch (e) {
            return e;
        }
    }
}
