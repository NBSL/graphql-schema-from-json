export function isObject(value: any) {
    // console.log(value, Object.prototype.toString.call(value) === '[object Object]');
    return Object.prototype.toString.call(value) === '[object Object]';
}

export function isDate(value: any) {
    return (value instanceof Date) || typeof value !== 'string' || Number.isInteger(value) || !isNaN(new Date(value).getDate())
}

export function isFloat(value: string) {
    const maybeFloat = parseFloat(value)
    return !isNaN(maybeFloat) && isFinite(maybeFloat)
}

export function every(values: any[], type: string | ((val: any) => boolean)) {
    if (typeof type === 'function') {
        return values.every(function (value) {
            // console.log(value);
            return type(value)
        })
    }
    return values.every(function (value) {
        return typeof value === type
    })

}