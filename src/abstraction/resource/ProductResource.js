const getJson = (data) => {
    return {
        id: data.id,
        name: data.name,
        stock: data.stock,
        description: data.description,
        branch_id: data.branch_id,
    };
};

const getArray = (data) => {
    return data.map((Item) => getJson(Item));
};

const setData = (data, hasUpdate = false) => {
    return {
        id: data.id,
        name: data.name,
        stock: data.stock,
        description: data.description,
        branch_id: data.branch_id,
        _method: hasUpdate ? "put" : "post",
    };
};

export {setData, getArray, getJson};
