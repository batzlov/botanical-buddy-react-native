// email regex according to RFC 5322
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// minimum 8 characters with one number and one uppercase letter
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9\u00C0-\u017F\d]{8,}$/;
// string regex, min 3 and max 100 characters, upper and lower case + white spaces
export const stringRegex = new RegExp(/^([a-zA-Z0-9\u00C0-\u017F\s]{1,})$/);
export const numberRegex = new RegExp(/^([0-9\s]{1,})$/);