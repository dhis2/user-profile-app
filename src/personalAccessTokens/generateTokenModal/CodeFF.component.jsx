import { hasValue, InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import classes from './CodeFF.module.css'

const CodeFF = () => {
    return (
        <div className={classes.container}>
            <ReactFinalForm.Field
                label={i18n.t('Token name')}
                component={InputFieldFF}
                validate={hasValue}
                name="code"
                helpText={i18n.t('A unique name for this token.')}
                required
            />
        </div>
    )
}

export default CodeFF
