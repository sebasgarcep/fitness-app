import { combineReducers } from 'redux';

import exercises from './exercises';
import globals from './globals';
import session from './session';

export default combineReducers({
    exercises,
    globals,
    session,
});