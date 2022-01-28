import {SetPagination, SetQueries} from "../../service/SetPagination";
import {serialize} from 'object-to-formdata';

const getJson = (data) => {
    return {
        id: data.id,
        description: data.description,
        service: data.service,
        requirement: data.requirement,
        step: data.step,
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
        description: data.description,
        service_id: data.service_id,
        requirement_id: data.requirement_id,
        step_id: data.step_id,
        _method: hasUpdate ? "put" : "post",
    };

    return serialize(
        params,
    );
};

export {setData, getArray, getJson, setQuery};
