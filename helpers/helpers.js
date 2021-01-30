

const greaterThan = (a, b) => {
    return a > b ? true : false
}

const equals = (a, b) => {
    return a == b ? true:false
}

const notEquals = (a, b) => {
    return a != b ? true:false
}

const greaterThanOrEquals = (a, b) => {
    return a >= b ? true : false
}

const contains = (a, b) => {
    return (a.indexOf(b) != -1) ? true : false;
}

const checkCondition = (condition)=> {
    let functionToCall;
    switch (condition) {
        case 'gt':
            functionToCall =  greaterThan
            break;
        
        case 'gte': 
            functionToCall = greaterThanOrEquals
            break;

        case 'eq': 
            functionToCall = equals
            break;
        
        case 'neq':
            functionToCall = notEquals
            break;
        
        case 'contains':
            functionToCall = contains
            break;
        default:
            return false;
    }
    return functionToCall;
}

module.exports = { 
    greaterThan, greaterThanOrEquals, equals, notEquals, contains, checkCondition
}