import { Card, CardText } from 'material-ui/Card'
import PropTypes from 'prop-types'
import React from 'react'
import InfoHeader from '../layout/InfoHeader.component.jsx'
import InfoRow from '../layout/InfoRow.component.jsx'

const styles = {
    card: {
        marginTop: 8,
        marginRight: '1rem',
        padding: '0 1rem',
    },
}

const AboutSection = ({ header, attributes }) => (
    <div>
        <InfoHeader text={header} />
        <Card style={styles.card}>
            <CardText>
                <table className="info-content">
                    <tbody>
                        {attributes.map(({ label, value }) => (
                            <InfoRow
                                key={label}
                                label={label}
                                value={
                                    typeof value === 'boolean'
                                        ? value.toString()
                                        : value
                                }
                            />
                        ))}
                    </tbody>
                </table>
            </CardText>
        </Card>
    </div>
)

AboutSection.propTypes = {
    attributes: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
        })
    ).isRequired,
    header: PropTypes.string.isRequired,
}

export default AboutSection
