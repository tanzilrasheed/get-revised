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

export { editObjProperty };