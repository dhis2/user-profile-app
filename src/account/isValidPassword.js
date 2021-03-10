// Atleast one digit
const oneDigit = /^(?=.*\d)/

// Atleast one uppercase character
const oneUpperCase = /^(?=.*[A-Z])/

// Atleast one special character
// Using this regex to match all non-alphanumeric characters to match server-side implementation
// https://github.com/dhis2/dhis2-core/blob/master/dhis-2/dhis-services/dhis-service-core/src/main/java/org/hisp/dhis/user/SpecialCharacterValidationRule.java#L39
const oneSpecialCharacter = /[^a-zA-Z0-9]/

export default function isValidPassword(value) {
    if (!value) {
        return true
    }
    return (
        oneDigit.test(value) &&
        oneUpperCase.test(value) &&
        oneSpecialCharacter.test(value) &&
        value.length > 7 &&
        value.length < 36
    )
}
