import {SetPagination, SetQueries} from "../../service/SetPagination";
import {serialize} from 'object-to-formdata';

const getJson = (data) => {
    return {
        id: data.id,
        title: data.title,
        address: data.address,
        description: data.description,
        thumbnail: data.main_image ? data.main_image.image : null,
        url: data.main_image ? data.main_image.image : null,
        category_id: data.category ? data.category.id : null,
        category: data.category,
        user: data.user,
        city: data.city.name,
        project: data.project,
        city_id: data.city.id,
        county: data.city.county.name,
        province: data.city.county.province.name,
    };
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
    let params = {
        title: data.title,
        address: data.address,
        description: data.description,
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
