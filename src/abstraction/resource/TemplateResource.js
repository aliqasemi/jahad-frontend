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
    return {
        id: data.id,
        name: data.name,
        template: data.template,
        _method: hasUpdate ? "put" : "post",
    };
};

export {setData, getArray, getJson, setFilterQuery};
