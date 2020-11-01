import getFilterTypesFromData from './getFilterTypesFromData';

export default (name, data, idArray) =>
    Object.values(getFilterTypesFromData(data, idArray)).reduce((hasJSON, type) => {
        if (hasJSON) return true;
        return Object.values(type.getFields()).reduce((hasJSONField, field) => {
            if (hasJSONField) return true;
            return field.type.name == name;
        }, false);
    }, false);
