import React from 'react';
import PropTypes from 'prop-types';

const InfoRow = ({ label, value, labelStyle }) => (
    <tr className="info-row">
        <td className="info-cell-name" style={labelStyle}>{label}</td>
        <td className="info-cell-value">{value}</td>
    </tr>
);

InfoRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired,
    labelStyle: PropTypes.object,
};

InfoRow.defaultProps = {
    labelStyle: {},
};

export default InfoRow;
