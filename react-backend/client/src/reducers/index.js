import {combineReducers} from 'redux';
import {Actions, Active} from './user-actions';

const allReducers = combineReducers({
    films: Actions,
    activeFilm: Active,
});

export default allReducers;