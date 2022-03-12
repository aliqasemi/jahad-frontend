const getJson = (data) => {
    let result = {
        id: data.id,
        name: data.name,
        description: data.description,
        number: data.number,
    };

    result.productRequireProduct = data.product_require_product.map((t) => {
        return {
            id: t.id,
            number: t.number,
            description: t.description,
            product: t.product,
            branch: t.branch,
        };
    });

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
