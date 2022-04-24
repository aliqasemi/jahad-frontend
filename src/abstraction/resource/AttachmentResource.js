let result = [];
const getJson = (data) => {
    for (let key in data) {
        if (key !== 'point') {
            result.push(
                {
                    id: data[key].id,
                    point: data['point'],
                    city: data[key].city,
                    title: data[key].title,
                    user: data[key].user,
                    address: data[key].address,
                    description: data[key].description,
                    project: data[key].project,
                    category: data[key].category,
                    projects: data[key].projects,
                    available_province: data[key].available_province,
                }
            )
        }
    }
};

const getArray = (data) => {
    result = [];
    data.map((Item) => getJson(Item));
    return result;
};

export {getArray, getJson};
