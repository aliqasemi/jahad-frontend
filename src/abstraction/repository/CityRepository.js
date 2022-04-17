import {
    getArray
} from "../resource/CItyresource";
import axios from "axios"
import basic_url from "@/router/url";

export default class CityRepository {
    async indexProvinces() {
        try {
            let response = await axios.get(basic_url + 'provinces');
            if (response && response.status === 200) {
                return getArray(response.data.data);
            }
        } catch (e) {
            return e;
        }
    }

    async indexCounties(province_id) {
        try {
            let response = await axios.get(basic_url + 'counties/' + province_id);
            if (response && response.status === 200) {
                return getArray(response.data.data);
            }
        } catch (e) {
            return e;
        }
    }

    async indexCities(county_id) {
        try {
            let response = await axios.get(basic_url + 'cities/' + county_id);
            if (response && response.status === 200) {
                return getArray(response.data.data);
            }
        } catch (e) {
            return e;
        }
    }

    async showCity(city_id) {
        try {
            let response = await axios.get(basic_url + "cities/show/" + city_id);
            if (response && response.status === 200) {
                return response.data.data;
            }
        } catch (e) {
            return e;
        }
    }
}
