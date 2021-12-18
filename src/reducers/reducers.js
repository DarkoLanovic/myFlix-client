import { SET_MOVIES } from '../actions/actions';

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}


export default movies;