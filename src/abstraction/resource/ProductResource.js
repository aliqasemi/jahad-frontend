import {SetPagination, SetQueries} from "../../service/SetPagination";
import {serialize} from "object-to-formdata";

const getJson = (data) => {
    let result = {
        id: data.id,
        name: data.name,
        description: data.description,
        thumbnail: data.main_image ? data.main_image.image : null,
        url: data.main_image ? data.main_image.image : null,
    };

    if (data.branches) {
        result.branches = data.branches.map((t) => {
            return {
                branch_id: t.id,
                description: t.branch_product.description,
                stock: t.branch_product.stock,
            };
        });
    }

    return result;
};

const getArray = ({data, meta}) => {
    const pagination = SetPagination(meta);
    data = data.map((Item) => getJson(Item));
    return {data, pagination};
};

export const setQuery = (data) => {
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
    let params = serialize({});

    params.branches = {};

    params.id = data.id;
    params.name = data.name;
    params.description = data.description;
    params.crop_data = data.crop_data;
    params.main_image = data.image;
    params._method = hasUpdate ? "put" : "post"

    if (data.branches) {
        data.branches.forEach((t, i) => {
            params.branches[i] = {
                branch_id: t.branch_id,
                description: t.description,
                stock: t.stock,
            };
        })
    }

    return serialize(
        params,
    );
};

export {setData, getArray, getJson, setFilterQuery};
