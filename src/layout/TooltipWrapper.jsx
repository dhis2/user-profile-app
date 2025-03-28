import { Tooltip } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const TooltipWrapper = ({ show, content, children }) => {
    if (!show) {
        return <>{children}</>
    }
    return <Tooltip content={content}>{children}</Tooltip>
}

TooltipWrapper.propTypes = {
    children: PropTypes.node,
    content: PropTypes.string,
    show: PropTypes.bool,
}

export default TooltipWrapper
