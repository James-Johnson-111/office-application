export const minLengthValidate = ( value, minLength ) => {

    let isValid = false;
    isValid = value.length > minLength;

    return isValid;

}

export const maxLengthValidate = ( value, maxLength ) => {

    let isValid = false;
    isValid = value.length < maxLength;

    return isValid;

}