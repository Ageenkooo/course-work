import * as types from '../constants/actionTypes'

export const changeState = (state) => ({ type: types.CHANGE_STATE, payload: state });
export const select = (film) => ({type: types.FILM_SELECTED, payload : film})