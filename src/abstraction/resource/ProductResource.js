import {SetPagination, SetQueries} from "../../service/SetPagination";
import {serialize} from "object-to-formdata";

const getJson = (data) => {
    return {
        id: data.id,
        name: data.name,
        stock: data.stock,
        description: data.description,
        branch_id: data.branch_id,
        thumbnail: data.main_image ? data.main_image.image : null,
        url: data.main_image ? data.main_image.image : null,
    };
};

const getArray = ({data, meta}) => {
    const pagination = SetPagination(meta);
    data = data.map((Item) => getJson(Item));
    return {data, pagination};
};

export const setQuery = (data) => {
    return SetQueries(data);
};

const setData = (data, hasUpdate = false) => {
    let params = {
        id: data.id,
        name: data.name,
        stock: data.stock,
        description: data.description,
        branch_id: data.branch_id,
        crop_data: data.crop_data,
        main_image: data.image,
        _method: hasUpdate ? "put" : "post",
    };

    return serialize(
        params,
    );
};

export {setData, getArray, getJson};
