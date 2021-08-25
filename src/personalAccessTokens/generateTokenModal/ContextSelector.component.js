import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales'
import styles from './ContextSelector.module.css'

const Context = ({ title, children, onClick }) => (
    <button className={styles.context} onClick={onClick}>
        <h3 className={styles.contextTitle}>{title}</h3>
        <div>{children}</div>
    </button>
)

Context.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

const ContextSelector = ({ setContext }) => (
    <>
        <h2 className={styles.header}>
            {i18n.t(
                'In which context will this personal access token be used?'
            )}
        </h2>
        <div className={styles.contexts}>
            <Context
                title={i18n.t('Server/script context')}
                onClick={() => setContext('SERVER')}
            >
                {i18n.t('Use cases: Integrations and scripts', {
                    nsSeparator: '-:-',
                })}
            </Context>
            <Context
                title={i18n.t('Browser context')}
                onClick={() => setContext('BROWSER')}
            >
                {i18n.t('Use cases: Public portals', { nsSeparator: '-:-' })}
            </Context>
        </div>
    </>
)

ContextSelector.propTypes = {
    setContext: PropTypes.func.isRequired,
}

export default ContextSelector
