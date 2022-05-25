import { Radio } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales/index.js'
import styles from './ContextSelector.module.css'

const Context = ({ title, children, selected, onSelect }) => (
    <div
        className={selected ? styles.selectedContext : styles.context}
        onClick={onSelect}
    >
        <Radio checked={selected} onChange={onSelect} dense />
        <div>
            <h3 className={styles.contextTitle}>{title}</h3>
            <div className={styles.contextDescription}>{children}</div>
        </div>
    </div>
)

Context.propTypes = {
    children: PropTypes.node.isRequired,
    selected: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

const ContextSelector = ({ context, setContext }) => (
    <>
        <h2 className={styles.header}>
            {i18n.t('Choose the context where this token will be used.')}
        </h2>
        <div className={styles.contexts}>
            <Context
                title={i18n.t('Server/script context')}
                selected={context === 'SERVER'}
                onSelect={() => setContext('SERVER')}
            >
                {i18n.t(
                    `Used for integrations and scripts that won't be accessed by a browser.`
                )}
            </Context>
            <Context
                title={i18n.t('Browser context')}
                selected={context === 'BROWSER'}
                onSelect={() => setContext('BROWSER')}
            >
                {i18n.t(
                    'Used for applications, like public portals, that will be accessed with a web browser.'
                )}
            </Context>
        </div>
    </>
)

ContextSelector.propTypes = {
    setContext: PropTypes.func.isRequired,
    context: PropTypes.string,
}

export default ContextSelector
