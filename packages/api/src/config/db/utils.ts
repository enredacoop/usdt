function camelToSnake(obj: any) {
    const newObj: any = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Convert each camelCase key to snake_case
            const snakeKey = key.replace(/([A-Z])/g, function (match) {
                return '_' + match.toLowerCase();
            });
            // Assign the value to the new snake_case key
            newObj[snakeKey] = obj[key];
        }
    }
    return newObj;
}

function snakeToCamel(obj: any) {
    const newObj: any = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Convert each snake_case key to camelCase
            const camelKey = key.replace(/(_\w)/g, function (match) {
                return match[1].toUpperCase();
            });
            // Assign the value to the new camelCase key
            newObj[camelKey] = obj[key];
        }
    }
    return newObj;
}

export { camelToSnake, snakeToCamel };
