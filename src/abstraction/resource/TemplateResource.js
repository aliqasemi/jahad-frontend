const getJson = (data) => {
    let result = {
        id: data.id,
        name: data.name,
        template: data.template,
        canDelete: data.can_delete,
    };

    if (data.variables) {
        result.variables = Object.entries(data.variables).map(value => {
            return {
                title: value[1],
                value: '{' + value[0] + '}',
            }
        });
    }

    return result;
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
