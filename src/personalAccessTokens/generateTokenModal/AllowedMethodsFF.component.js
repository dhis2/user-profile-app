import { ReactFinalForm, SwitchFieldFF } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import styles from './AllowedMethodsFF.module.css'

const AllowedMethodsFF = () => (
    <>
        <h3 className={styles.header}>{i18n.t('Allowed HTTP methods')}</h3>
        <ReactFinalForm.Field
            name="allowedMethodsGET"
            label={i18n.t('GET', { context: 'HTTP method' })}
            type="checkbox"
            component={SwitchFieldFF}
            initialValue={true}
            className={styles.switch}
        />
        <ReactFinalForm.Field
            name="allowedMethodsPOST"
            label={i18n.t('POST', { context: 'HTTP method' })}
            type="checkbox"
            component={SwitchFieldFF}
            initialValue={false}
            className={styles.switch}
        />
        <ReactFinalForm.Field
            name="allowedMethodsPUT"
            label={i18n.t('PUT', { context: 'HTTP method' })}
            type="checkbox"
            component={SwitchFieldFF}
            initialValue={false}
            className={styles.switch}
        />
        <ReactFinalForm.Field
            name="allowedMethodsPATCH"
            label={i18n.t('PATCH', { context: 'HTTP method' })}
            type="checkbox"
            component={SwitchFieldFF}
            initialValue={false}
            className={styles.switch}
        />
        <ReactFinalForm.Field
            name="allowedMethodsDELETE"
            label={i18n.t('DELETE', { context: 'HTTP method' })}
            type="checkbox"
            component={SwitchFieldFF}
            initialValue={false}
            className={styles.switch}
        />
    </>
)

export default AllowedMethodsFF
