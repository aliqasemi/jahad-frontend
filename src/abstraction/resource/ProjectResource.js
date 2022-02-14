import {SetPagination, SetQueries} from "../../service/SetPagination";
import {serialize} from 'object-to-formdata';

const getJson = (data) => {
    let result = {
        id: data.id,
        name: data.name,
        description: data.description,
        step: data.step,
        requirement: data.requirement,
        services: data.services,
    };

    result.requirement = {
        id: data.requirement.id,
        title: data.requirement.title,
        address: data.requirement.address,
        description: data.requirement.description,
        thumbnail: data.requirement.main_image ? data.requirement.main_image.image : null,
        url: data.requirement.main_image ? data.requirement.main_image.image : null,
        category: data.requirement.category,
        user: data.requirement.user,
        city: data.requirement.city ? data.requirement.city.name : null,
        city_id: data.requirement.city ? data.requirement.city.id : null,
        county: data.requirement.city ? data.requirement.city.county.name : null,
        province: data.requirement.city ? data.requirement.city.county.province.name : null,
    };

    result.services = data.services.map((service) => {
        return {
            id: service.id,
            title: service.title,
            address: service.address,
            description: service.description,
            thumbnail: service.main_image ? service.main_image.image : null,
            url: service.main_image ? service.main_image.image : null,
            category: service.category ? service.category : null,
            user: service.user,
            city: service.city ? service.city.name : null,
            city_id: service.city ? service.city.id : null,
            county: service.city ? service.city.county.name : null,
            province: service.city ? service.city.county.province.name : null,
            available_province: data.available_province,
        }
    });
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

const setData = (data, hasUpdate = false) => {
    let params = {
        name: data.name,
        description: data.description,
        service_id: data.service_id,
        requirement_id: data.requirement_id,
        step_id: data.step_id,
        _method: hasUpdate ? "put" : "post",
    };

    if (!hasUpdate) {
        params.services = data.services
    }

    return serialize(
        params,
    );
};

export {setData, getArray, getJson, setQuery, setFilterQuery};
