import React from 'react';
import { shallow } from 'enzyme';
import log from 'loglevel';

import UserSettingsFields from '../../src/userSettingsFields.component.js';
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component.js';

describe('UserSettingsFields', () => {
    let fieldsComponent;

    beforeEach(() => {
        fieldsComponent = shallow(<UserSettingsFields category="profile" currentSettings={[
            'email',
            'phoneNumber',
            'introduction',
            'jobTitle',
            'gender',
            'birthday',
            'nationality',
            'employer',
            'education',
            'interests',
            'languages',
        ]}/>, { context: { d2: {i18n: {getTranslation: function(t) { return t;}}}}});
    });

    it('should pass 11 fields to the Form Builder component', () => {
        const formBuilderComponent = fieldsComponent.find(FormBuilder);

        expect(formBuilderComponent.props().fields).to.have.length(11);
    });
});