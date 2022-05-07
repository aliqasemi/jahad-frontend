import {SetPagination, SetQueries} from "../../service/SetPagination";
import {serialize} from 'object-to-formdata';
import * as shamsi from 'shamsi-date-converter';

const getJson = (data) => {
    let result = {
        id: data.id,
        title: data.title,
        address: data.address,
        description: data.description,
        timeout: data.timeout,
        thumbnail: data.main_image ? data.main_image.image : null,
        url: data.main_image ? data.main_image.image : null,
        category: data.category ? data.category : null,
        category_id: data.category ? data.category.id : null,
        user: data.user,
        city: data.city.name,
        city_id: data.city.id,
        county: data.city.county.name,
        province: data.city.county.province.name,
        available_province: data.available_province,
    };

    if (data.available_province) {
        result.available_province_ids = data.available_province.map((e) => {
            return e.id;
        });
    }

    return result;
};

const getArray = ({data, meta}) => {
    const pagination = SetPagination(meta);
    data = data.map((Item) => getJson(Item));
    return {data, pagination};
};

const setQuery = (data) => {
    return SetQueries(data);
};

const setData = (data, hasUpdate = false) => {

    let time = null;
    if (data.timeout) {
        let separator = data.timeout.split('/');
        time = shamsi.jalaliToGregorian(parseInt(separator[0]), parseInt(separator[1]), parseInt(separator[2])).join('-')
    }

    let params = {
        title: data.title,
        address: data.address,
        description: data.description,
        timeout: time,
        available_province_ids: data.available_province_ids,
        crop_data: data.crop_data,
        main_image: data.image,
        category_id: data.category_id ? (data.category_id.length ? data.category_id[0] : data.category_id) : null,
        city_id: data.city_id,
        _method: hasUpdate ? "put" : "post",
    };

    return serialize(
        params,
    );
};

const setFilterQuery = (values, type = 'and') => {

    let query = {
        type: type,
    };

    for (const [key, value] of Object.entries(values)) {
        if (key !== 'type') {
            let keyString = 'filter' + '[' + key + ']'
            query[keyString] = value
        }
    }

    return query;
}

export {setData, getArray, getJson, setQuery, setFilterQuery};
