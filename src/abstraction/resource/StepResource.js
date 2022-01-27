const getJson = (data) => {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        sort: data.sort,
    };
};

const getArray = (data) => {
    return data.map((Item) => getJson(Item));
};

const setData = (data, hasUpdate = false) => {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        send_sms: data.send_sms,
        template_id: 0,
        _method: hasUpdate ? "put" : "post",
    };
};

export {setData, getArray, getJson};
