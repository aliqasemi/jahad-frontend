const getJson = (data) => {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        serviceTemplate: data.serviceTemplate,
        requirementTemplate: data.requirementTemplate,
        send_sms: data.send_sms,
        service_template_id: data.serviceTemplate ? data.serviceTemplate.id : null,
        requirement_template_id: data.requirementTemplate ? data.requirementTemplate.id : null,
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
        service_template_id: data.service_template_id,
        requirement_template_id: data.requirement_template_id,
        project_id: data.project_id,
        _method: hasUpdate ? "put" : "post",
    };
};

export {setData, getArray, getJson};
