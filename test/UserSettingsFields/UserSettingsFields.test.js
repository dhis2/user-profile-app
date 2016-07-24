import React from 'react';
import { shallow } from 'enzyme';
import log from 'loglevel';

import UserSettingsFields from '../../src/userSettingsFields.component.js';
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component.js';
import userSettingsStore from '../../src/userSettingsStore';

describe('UserSettingsFields', () => {
    let fieldsComponent;

    userSettingsStore.setState(Object.assign({}, {
          "keyMessageSmsNotification": null,
          "keyDbLocale": null,
          "keyTrackerDashboardLayout": null,
          "keyStyle": null,
          "keyAutoSaveDataEntryForm": null,
          "keyUiLocale": null,
          "keyAutoSavetTrackedEntityForm": null,
          "keyAnalysisDisplayProperty": null,
          "keyAutoSaveCaseEntryForm": null,
          "keyMessageEmailNotification": null,
          "code": "admin",
          "lastUpdated": "2016-07-24T05:25:59.781+0000",
          "id": "M5zQapPyTZI",
          "created": "2016-07-24T05:25:59.781+0000",
          "name": "admin admin",
          "lastLogin": "2016-07-24T05:25:59.810+0000",
          "displayName": "admin admin",
          "externalAuth": false,
          "externalAccess": false,
          "disabled": false,
          "passwordLastUpdated": "2016-07-24T05:25:59.812+0000",
          "invitation": false,
          "selfRegistered": false,
          "username": "admin",
          "userInfo": {
            "id": "M5zQapPyTZI"
          },
          "cogsDimensionConstraints": [],
          "catDimensionConstraints": [],
          "translations": [],
          "userGroupAccesses": [],
          "attributeValues": [],
          "surname": "admin",
          "firstName": "admin",
          "teiSearchOrganisationUnits": [],
          "authorities": {},
          "userSettings": {
            "api": {
              "baseUrl": "http://localhost:8080/api",
              "defaultRequestSettings": {
                "data": {},
                "contentType": "application/json"
              }
            },
            "keyMessageSmsNotification": false,
            "keyDbLocale": null,
            "keyTrackerDashboardLayout": null,
            "keyStyle": "light_blue/light_blue.css",
            "keyAutoSaveDataEntryForm": false,
            "keyUiLocale": null,
            "keyAutoSavetTrackedEntityForm": false,
            "keyAnalysisDisplayProperty": "name",
            "keyAutoSaveCaseEntryForm": false,
            "keyMessageEmailNotification": false
          },
          "systemSettingsDefault": {
            "keyStyle": "light_blue/light_blue.css",
            "keyAnalysisDisplayProperty": "name",
            "keyMessageEmailNotification": "false",
            "keyMessageSmsNotification": "false"
          },
          "styles": [
            {
              "id": "green/green.css",
              "displayName": "Green"
            },
            {
              "id": "india/india.css",
              "displayName": "India"
            },
            {
              "id": "light_blue/light_blue.css",
              "displayName": "Light Blue"
            },
            {
              "id": "myanmar/myanmar.css",
              "displayName": "Myanmar"
            },
            {
              "id": "vietnam/vietnam.css",
              "displayName": "Vietnam"
            }
          ],
          "locales": [
            {
              "id": "ar",
              "displayName": "Arabic"
            },
            {
              "id": "ar_EG",
              "displayName": "Arabic (Egypt)"
            },
            {
              "id": "ar_IQ",
              "displayName": "Arabic (Iraq)"
            },
            {
              "id": "ar_SD",
              "displayName": "Arabic (Sudan)"
            },
            {
              "id": "bn",
              "displayName": "Bengali"
            },
            {
              "id": "bi",
              "displayName": "Bislama"
            },
            {
              "id": "my",
              "displayName": "Burmese"
            },
            {
              "id": "zh",
              "displayName": "Chinese"
            },
            {
              "id": "en",
              "displayName": "English"
            },
            {
              "id": "fr",
              "displayName": "French"
            },
            {
              "id": "in_ID",
              "displayName": "Indonesian (Indonesia)"
            },
            {
              "id": "km",
              "displayName": "Khmer"
            },
            {
              "id": "rw",
              "displayName": "Kinyarwanda"
            },
            {
              "id": "lo",
              "displayName": "Lao"
            },
            {
              "id": "mn",
              "displayName": "Mongolian"
            },
            {
              "id": "ne",
              "displayName": "Nepali"
            },
            {
              "id": "pt",
              "displayName": "Portuguese"
            },
            {
              "id": "pt_BR",
              "displayName": "Portuguese (Brazil)"
            },
            {
              "id": "ru",
              "displayName": "Russian"
            },
            {
              "id": "es",
              "displayName": "Spanish"
            },
            {
              "id": "sv",
              "displayName": "Swedish"
            },
            {
              "id": "tg",
              "displayName": "Tajik"
            },
            {
              "id": "tet",
              "displayName": "Tetum"
            },
            {
              "id": "ur",
              "displayName": "Urdu"
            },
            {
              "id": "vi",
              "displayName": "Vietnamese"
            },
            {
              "id": "ckb",
              "displayName": "ckb"
            }
          ],
          "dblocales": [
            {
              "id": "ar",
              "displayName": "Arabic"
            },
            {
              "id": "ar_EG",
              "displayName": "Arabic (Egypt)"
            },
            {
              "id": "ar_IQ",
              "displayName": "Arabic (Iraq)"
            },
            {
              "id": "ar_SD",
              "displayName": "Arabic (Sudan)"
            },
            {
              "id": "bn",
              "displayName": "Bengali"
            },
            {
              "id": "bi",
              "displayName": "Bislama"
            },
            {
              "id": "my",
              "displayName": "Burmese"
            },
            {
              "id": "zh",
              "displayName": "Chinese"
            },
            {
              "id": "en",
              "displayName": "English"
            },
            {
              "id": "fr",
              "displayName": "French"
            },
            {
              "id": "in_ID",
              "displayName": "Indonesian (Indonesia)"
            },
            {
              "id": "km",
              "displayName": "Khmer"
            },
            {
              "id": "rw",
              "displayName": "Kinyarwanda"
            },
            {
              "id": "lo",
              "displayName": "Lao"
            },
            {
              "id": "mn",
              "displayName": "Mongolian"
            },
            {
              "id": "ne",
              "displayName": "Nepali"
            },
            {
              "id": "pt",
              "displayName": "Portuguese"
            },
            {
              "id": "pt_BR",
              "displayName": "Portuguese (Brazil)"
            },
            {
              "id": "ru",
              "displayName": "Russian"
            },
            {
              "id": "es",
              "displayName": "Spanish"
            },
            {
              "id": "sv",
              "displayName": "Swedish"
            },
            {
              "id": "tg",
              "displayName": "Tajik"
            },
            {
              "id": "tet",
              "displayName": "Tetum"
            },
            {
              "id": "ur",
              "displayName": "Urdu"
            },
            {
              "id": "vi",
              "displayName": "Vietnamese"
            },
            {
              "id": "ckb",
              "displayName": "ckb"
            }
          ]
        }));

    beforeEach(() => {
        fieldsComponent = shallow(<UserSettingsFields category="profile" currentSettings={[
            'firstName',
            'surname',
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
        ]}/>, { context: { d2: {i18n: {getTranslation: function(t) { return t;}}, currentUser: {systemSettingsDefault: {}}}}});
    });

    it('should pass 13 fields to the Form Builder component', () => {
        const formBuilderComponent = fieldsComponent.find(FormBuilder);

        expect(formBuilderComponent.props().fields).to.have.length(13);
    });
});