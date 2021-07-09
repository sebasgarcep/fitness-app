import { combineReducers } from 'redux';

import exercises from './exercises';
import globals from './globals';
import meals from './meals';

export default combineReducers({
    exercises,
    globals,
    meals,
});