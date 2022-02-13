const getJson = (data) => {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        template: data.template,
        send_sms: data.send_sms,
        template_id: data.template ? data.template.id : null,
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
        template_id: data.template_id,
        project_id: data.project_id,
        _method: hasUpdate ? "put" : "post",
    };
};

export {setData, getArray, getJson};
