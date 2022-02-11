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

const getArray = (data) => {
    return data.map((Item) => getJson(Item));
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
