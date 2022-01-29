const getJson = (data) => {
    return {
        id: data.id,
        name: data.name,
        template: data.template,
    };
};

const getArray = (data) => {
    return data.map((Item) => getJson(Item));
};

const setData = (data, hasUpdate = false) => {
    return {
        id: data.id,
        name: data.name,
        template: data.template,
        _method: hasUpdate ? "put" : "post",
    };
};

export {setData, getArray, getJson};
