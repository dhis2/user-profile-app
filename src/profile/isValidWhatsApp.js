const PHONE_PATTERN = /^\+(?:[0-9].?){4,14}[0-9]$/

export default function isValidWhatsApp(value) {
    // It's an optional field so empty is also valid
    return !value || PHONE_PATTERN.test(value)
}
isValidWhatsApp.message = 'invalid_whats_app'
