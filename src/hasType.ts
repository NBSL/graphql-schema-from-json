import getFilterTypesFromData from './getFilterTypesFromData';
import { JsonData } from './interfaces'

export default (name: string, data: JsonData, idArray: string[]) =>
    Object.values(getFilterTypesFromData(data, idArray)).reduce((hasJSON, type) => {
        if (hasJSON) return true;
        return Object.values(type.getFields()).reduce((hasJSONField, field) => {
            if (hasJSONField) return true;
            return field.type.name == name;
        }, false);
    }, false);
