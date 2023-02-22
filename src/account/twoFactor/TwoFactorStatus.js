import i18n from '@dhis2/d2-i18n'
import { Tag } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './TwoFactorStatus.module.css'

const TwoFactorStatus = ({ isTwoFactorOn }) => (
    <h4 className={styles.statusHeader}>
        {i18n.t('2 Factor Authentication is currently')}{' '}
        <Tag positive={isTwoFactorOn} bold>
            {isTwoFactorOn ? i18n.t('enabled') : i18n.t('disabled')}
        </Tag>
    </h4>
)

TwoFactorStatus.propTypes = {
    isTwoFactorOn: PropTypes.bool.isRequired,
}

export default TwoFactorStatus
