import PropTypes from 'prop-types'

const TokenPropType = PropTypes.shape({
    attributes: PropTypes.array.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    expiresAt: PropTypes.instanceOf(Date).isRequired,
    id: PropTypes.string.isRequired,
    key: PropTypes.string,
})

export default TokenPropType
