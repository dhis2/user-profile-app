import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';

import InfoItem from '../layout/InfoItem.component';
import InfoHeader from '../layout/InfoHeader.component';

const styles = {
    card: {
        marginTop: 8,
        marginRight: '1rem',
        padding: '0 1rem',
    },
};

const AboutSection = ({ header, attributes }) => (
    <div>
        <InfoHeader text={header} />
        <Card style={styles.card}>
            <CardText>
                <div className="info-content">
                    {attributes
                        .map(({ label, value }) => (
                            <InfoItem
                                key={label}
                                label={label}
                                value={value}
                            />
                        ))
                    }
                </div>
            </CardText>
        </Card>
    </div>
);

AboutSection.propTypes = {
    header: PropTypes.string.isRequired,
    attributes: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.node,
        }),
    ).isRequired,
};

export default AboutSection;
