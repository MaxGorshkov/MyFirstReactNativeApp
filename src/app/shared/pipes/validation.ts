import { getDeepValue, setDeepValue } from './deepValue';
import { uniqueStrings } from './array';

export interface ValidationItem {
    names: string;
    error: string;
    type: 'required' | 'pattern' | 'equals';
    pattern?: RegExp;
}

export class FormValidationError {
    constructor(error: string, isFirstField: boolean) {
        this.error = error;
        this.isFirstField = isFirstField;
    }

    public readonly error: string;
    public readonly isFirstField: boolean;
}

interface FieldWValue {
    field: string;
    value: any;
}

const arrayWildcard = '[]';
const getValuesToValidate = (fieldPrefix: string, field: string, data: any): FieldWValue[] => {
    const arrayWildcardIndex = field.indexOf(arrayWildcard);

    if (arrayWildcardIndex === -1) {
        return [{
            field: fieldPrefix + field,
            value: getDeepValue(data, field),
        }];
    }

    const leftSide = field.substring(0, arrayWildcardIndex);
    const unnormalizedRightSide = field.substring(arrayWildcardIndex + arrayWildcard.length);
    const rightSide = unnormalizedRightSide[0] === '.'
        ? unnormalizedRightSide.substring(1)
        : unnormalizedRightSide;
    const array = getDeepValue(data, leftSide) as Array<any>;

    if (!array || !array.length) {
        return [];
    }

    if (rightSide) {
        return array
            .map((value: any, index: number) => getValuesToValidate(
                fieldPrefix + leftSide + `.${index}.`,
                rightSide,
                value))
            .reduce((result: any[], current: any) => {
                return current instanceof Array
                    ? result.concat(current)
                    : result.concat([current]);
            }, []);
    }

    return array.map((value: any, index: number) => ({
        field: fieldPrefix + leftSide + `.${index}`,
        value,
    }));
};
const validateFieldFor = (validation: ValidationItem) => (fieldWValue: FieldWValue): boolean => {
    switch (validation.type) {
        case 'required':
            return !!fieldWValue.value && fieldWValue.value.toString().replace(/(\r\n\t|\n|\r\t|\s)/gm, '').length > 0;
        case 'pattern':
            return fieldWValue.value === null || fieldWValue.value === undefined || fieldWValue.value === ''
                || !validation.pattern
                || validation.pattern.test(fieldWValue.value);
        default:
            return true;
    }
};

export const validationPipe = (formData: any, fieldsWithValidation: ValidationItem[]) => {
    const clonedFormData = (formData) ? JSON.parse(JSON.stringify(formData)) : {};
    if (!fieldsWithValidation || !fieldsWithValidation.length) {
        return null;
    }

    const result: any = {};
    let firstErrorField: string | null = null;
    fieldsWithValidation.forEach((validationField) => {
        const fieldArray: string[] = validationField.names.split(',');
        const valuesArrays = fieldArray.map(field => getValuesToValidate('', field, clonedFormData));
        const validation = validateFieldFor(validationField);
        let validationResults: FieldWValue[][] = [];
        if (validationField.type === 'equals') {
            if (valuesArrays.length > 1) {
                const equalsResults: string[] = [];
                valuesArrays
                    .forEach(valuesToValidate =>
                        equalsResults.push(...valuesToValidate.map(item => item.value)));
                const uniqueValues = uniqueStrings(equalsResults);
                if (uniqueValues.length > 1) {
                    validationResults = [...valuesArrays];
                }
            }
        } else {
            validationResults = valuesArrays.map(valuesToValidate =>
                valuesToValidate.filter(fieldWValue => !validation(fieldWValue)));
        }
        const finded = validationResults.some(validationResult => !validationResult.length);

        if (!finded) {
            let firstErrorFieldForValidationRule: string | null = null;
            validationResults.forEach(validationResult => {
                validationResult.forEach((fieldWValue) => {
                    const errorText = (!firstErrorFieldForValidationRule) ? validationField.error : '';
                    setDeepValue(result,
                                fieldWValue.field,
                                new FormValidationError(
                                    errorText,
                                    !firstErrorField));
                    if (!firstErrorField) {
                        firstErrorField = fieldWValue.field;
                    }
                    if (!firstErrorFieldForValidationRule) {
                        firstErrorFieldForValidationRule = fieldWValue.field;
                    }
                });
            });
        }
    });

    if (!firstErrorField) {
        return null;
    }

    return result;
};
