import { combineReducers } from 'redux';

import exercises from './exercises';
import globals from './globals';

export default combineReducers({
    exercises,
    globals,
});