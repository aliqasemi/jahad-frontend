const getJson = (data) => {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        sort: data.sort,
    };
};

const getArray = (data) => {
    return data;
};

const setData = (data, hasUpdate = false) => {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        sort: data.sort,
        _method: hasUpdate ? "put" : "post",
    };
};

export {setData, getArray, getJson};
