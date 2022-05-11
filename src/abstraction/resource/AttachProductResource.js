const getJson = (data) => {
    let result = {
        id: data.id,
        name: data.name,
        description: data.description,
        number: data.number,
    };

    if (data.product_require_product.length) {
        result.productRequireProduct = data.product_require_product.map((t) => {
            let result = {
                id: t.id,
                number: t.number,
                description: t.description,
                product: t.product,
                branch: t.branch,
            };
            if (result.product === null) {
                result.product = {id: null}
            }
            if (result.branch === null) {
                result.branch = {id: null}
            }
            return result;
        });
    }

    return result;
};

const getArray = (data) => {
    data = data.map((Item) => getJson(Item));
    return data;
};

const setData = (data) => {
    let params = {};
    params.products = {};

    data.forEach((t, i) => {
        params.products[i] = {
            id: t.id,
            number: t.number,
            description: t.description,
            product_id: t.product.id,
            branch_id: t.branch.id,
        };
    });

    return params;
};

export {setData, getArray, getJson};
