import {combineReducers} from 'redux';
import {Actions, Active, ActiveSess} from './user-actions';

const allReducers = combineReducers({
    films: Actions,
    activeFilm: Active,
    activeSession: ActiveSess,
});

export default allReducers;