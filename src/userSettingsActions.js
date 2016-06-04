import Action from 'd2-ui/lib/action/Action';
import { categories } from './userSettingsCategories';
import { getInstance as getD2 } from 'd2/lib/d2';
import { Observable } from 'rx';
import log from 'loglevel';

const settingsActions = Action.createActionsFromNames([
    'load',
    'setCategory',
    'saveUserKey',
    'saveProfile',
    'showSnackbarMessage',
]);

export default settingsActions;