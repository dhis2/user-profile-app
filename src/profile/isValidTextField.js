const REGEX_PATTERN = /[<>&"'`\/]/

export default function isValidTextField(value) {
    // It's an optional field so empty is also valid
    return !value || !REGEX_PATTERN.test(value)
}
isValidTextField.message = 'invalid_characters detected'
