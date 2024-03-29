import PropTypes from 'prop-types'
import React from 'react'
import AppTheme from '../layout/theme.js'

const styles = {
    header: {
        fontSize: 24,
        fontWeight: 300,
        color: AppTheme.rawTheme.palette.textColor,
        padding: '24px 0 12px 16px',
    },
}

const InfoHeader = ({ text }) => <div style={styles.header}>{text}</div>

InfoHeader.propTypes = {
    text: PropTypes.string.isRequired,
}

export default InfoHeader
