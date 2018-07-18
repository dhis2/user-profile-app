import React from 'react';
import PropTypes from 'prop-types';

import SetupInstructions from './SetupInstructions';

const styles = {
    guideHeader: {
        fontWeight: 300,
        padding: '24px 16px 24px 16px',
    },
};

const SetupGuide = (props, context) => (
    <div>
        <div style={styles.guideHeader}>
            {context.d2.i18n.getTranslation('qr_code_instructions')}
        </div>
        <SetupInstructions />
    </div>
);

SetupGuide.contextTypes = { d2: PropTypes.object.isRequired };

export default SetupGuide;
