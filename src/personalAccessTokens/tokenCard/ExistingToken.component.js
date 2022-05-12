import { Tag, Tooltip } from '@dhis2/ui'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales'
import styles from './ExistingToken.module.css'
import TokenPropType from './TokenPropType.js'

const getAttribute = (attributes, type, field) => {
    const attribute = attributes.find((attribute) => attribute.type === type)
    if (!attribute) {
        return null
    }
    return attribute[field]
}

const RelativeDateTime = ({ dateTime }) => (
    <Tooltip content={dateTime.toISOString()}>
        {moment(dateTime).fromNow()}
    </Tooltip>
)

RelativeDateTime.propTypes = {
    dateTime: PropTypes.instanceOf(Date).isRequired,
}

const Item = ({ title, children, singleLine }) => (
    <div className={singleLine ? styles.singleLineItem : styles.item}>
        <dt className={styles.itemTitle}>{title}</dt>
        <dd className={styles.itemValue}>{children}</dd>
    </div>
)

Item.defaultProps = {
    singleLine: false,
}

Item.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    singleLine: PropTypes.bool,
}

const ExistingToken = ({ token }) => {
    const { attributes, createdAt, expiresAt } = token
    const allowedMethods = getAttribute(
        attributes,
        'MethodAllowedList',
        'allowedMethods'
    )
    const allowedIps = getAttribute(attributes, 'IpAllowedList', 'allowedIps')
    const allowedReferrers = getAttribute(
        attributes,
        'RefererAllowedList',
        'allowedReferrers'
    )

    return (
        <dl className={styles.items}>
            <Item title={i18n.t('Expires')} singleLine>
                <RelativeDateTime dateTime={expiresAt} />
            </Item>
            <Item title={i18n.t('Created')} singleLine>
                <RelativeDateTime dateTime={createdAt} />
            </Item>
            {allowedMethods && (
                <Item title={i18n.t('Allowed HTTP methods')}>
                    <div className={styles.allowedMethods}>
                        {allowedMethods.map((method) => (
                            <Tag key={method} positive>
                                {method}
                            </Tag>
                        ))}
                    </div>
                </Item>
            )}
            {allowedIps && (
                <Item title={i18n.t('Allowed IP addresses')}>
                    <ul className={styles.allowedList}>
                        {allowedIps.map((ip) => (
                            <li key={ip}>{ip}</li>
                        ))}
                    </ul>
                </Item>
            )}
            {allowedReferrers && (
                <Item title={i18n.t('Allowed referrers')}>
                    <ul className={styles.allowedList}>
                        {allowedReferrers.map((referrer) => (
                            <li key={referrer}>{referrer}</li>
                        ))}
                    </ul>
                </Item>
            )}
        </dl>
    )
}

ExistingToken.propTypes = {
    token: TokenPropType.isRequired,
}

export default ExistingToken
