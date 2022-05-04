const getJson = (data) => {
    let result = {
        product: [],
        requirement: [],
        service: [],
        project: [],
    };

    data.product.forEach((value) => {
        result.product.push(value.count)
    });

    data.requirement.forEach((value) => {
        result.requirement.push(value.count)
    });

    data.service.forEach((value) => {
        result.service.push(value.count)
    });

    data.project.forEach((value) => {
        result.project.push(value.count)
    });

    return result;
};


export {getJson};
