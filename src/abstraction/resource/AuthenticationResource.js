import {SetPagination, SetQueries} from "@/service/SetPagination";

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

const getJson = (data) => {
    return {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        phoneNumber: data.phoneNumber,
        address: data.address,
        email: data.email,
        role: data.role,
        active: data.active,
    };
}

const getArray = ({data, meta}) => {
    const pagination = SetPagination(meta);
    data = data.map((Item) => getJson(Item));
    return {data, pagination};
};


const setData = (data, hasUpdate = false) => {
    return {
        firstname: data.firstname,
        lastname: data.lastname,
        phoneNumber: data.phoneNumber,
        address: data.address,
        email: data.email,
        role: data.role,
        active: data.active,
        _method: hasUpdate ? "put" : "post",
    };
};

export {getJson, setFilterQuery, setQuery, getArray, setData};
