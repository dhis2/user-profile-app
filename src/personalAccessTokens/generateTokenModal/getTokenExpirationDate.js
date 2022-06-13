import moment from 'moment'

const getTokenExpirationDate = (value) => {
    const today = moment()

    switch (value) {
        case '7_DAYS':
            return today.add(7, 'days')
        case '30_DAYS':
            return today.add(30, 'days')
        case '60_DAYS':
            return today.add(60, 'days')
        case '90_DAYS':
            return today.add(90, 'days')
        default:
            throw new Error(`Unknown expiration date input value: '${value}'`)
    }
}

export default getTokenExpirationDate
