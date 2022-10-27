import {actions} from './actions';
import {initialState} from './constants';

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FILTER_STUDENTS:
        return {
            ...state,
            filterStudents: action.payload
        }
    case actions.GET_STUDENTS_REQUEST:
        return {
            ...state,
            getStudents: {
                ...state.getStudents,
                loading: true
            },
        };
    case actions.GET_STUDENTS_SUCCESS:
        return {
            ...state,
            getStudents: {
                ...state.getStudents,
                loading: false,
                data: action.payload
            },
        };
    case actions.GET_STUDENTS_FAILURE:
        return {
            ...state,
            getStudents: {
                ...state.getStudents,
                loading: false,
                error: action.payload
            },
        };
    default:
        return state;
    }
};
export { reducer, actions, initialState };
