const editObjProperty = (obj, oldProp, newProp) => {
    const newObj = {}
    for (let x in obj) {
        if (oldProp === x) {
            newObj[newProp] = obj[oldProp];
        } else {
            newObj[x] = obj[x];
        }
    }
    return newObj;
}


const updateObjValue = (obj, locationArr, value) => {
    let current = obj
    for (let i = 0; i < locationArr.length - 1; i++) {
        current = current[locationArr[i]];                
    }
    current[locationArr[locationArr.length - 1]] = value;
}

export { editObjProperty, updateObjValue };