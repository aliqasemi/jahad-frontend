import {SetPagination, SetQueries} from "../../service/SetPagination";
import {serialize} from "object-to-formdata";

const getJson = (data) => {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        city_id: data.city.id,
        city: data.city,
        address: data.address,
        postal_code: data.postal_code,
        cell_number: data.cell_number,
        phone_number: data.phone_number,
        thumbnail: data.main_image ? data.main_image.image : null,
        url: data.main_image ? data.main_image.image : null,
    };
};

const getArray = ({data, meta}) => {
    const pagination = SetPagination(meta);
    data = data.map((Item) => getJson(Item));
    return {data, pagination};
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


const setQuery = (data) => {
    return SetQueries(data);
};

const setData = (data, hasUpdate = false) => {
    let params = {
        id: data.id,
        name: data.name,
        description: data.description,
        city_id: data.city_id,
        address: data.address,
        postal_code: data.postal_code,
        cell_number: data.cell_number,
        phone_number: data.phone_number,
        crop_data: data.crop_data,
        main_image: data.image,
        _method: hasUpdate ? "put" : "post",
    };

    return serialize(
        params,
    );
};

export {setData, getArray, getJson, setQuery, setFilterQuery};
