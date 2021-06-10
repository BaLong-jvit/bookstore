import * as types from '../../constants/ActionTypes';

var initSwitch = {
    isShowLogin: false,
    isShowRegister: false
}

var SwitchControlReducer = (state = initSwitch, actions) => {
    switch (actions.type) {
        case types.SHOW_LOGIN_FORM:
            state.isShowLogin = true
            return state;
        case types.HIDE_LOGIN_FORM:

            state.isShowLogin = false
            return state;
        case types.SHOW_REGISTER_FORM:
            state.isShowRegister = true
            return state;
        case types.HIDE_REGISTER_FORM:
            state.isShowRegister = false
            return state;
        default:
            return state;
    }
}
export default SwitchControlReducer;