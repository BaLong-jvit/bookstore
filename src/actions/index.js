import * as types from './../constants/ActionTypes';

export const contactGet = () => {
    return async (dispatch) => {
        return await fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/contact/get-contact-infor`).then(response => {
            return response.json();
        }).then(responseJson => {
            dispatch(contactAction(responseJson.contact));
        });
    }
}
const contactAction = (contact) => {
    return {
        type: types.CONTACT_GET,
        contact
    }
}

export const showFormLogin = () => {
    return {
        type: types.SHOW_LOGIN_FORM
    }
}
export const hideFormLogin = () => {
    return {
        type: types.HIDE_LOGIN_FORM
    }
}
export const showFormRegister = () => {
    return {
        type: types.SHOW_REGISTER_FORM
    }
}
export const hideFormRegister = () => {
    return {
        type: types.HIDE_REGISTER_FORM
    }
}

export const getAboutUs = () => {
    return async (dispatch) => {
        return await fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/about-us/items`).then(response => { return response.json() }).then(responseJson => {
            dispatch(aboutUsAction(responseJson.items))
        })
    }
}

export const aboutUsAction = (about) => {
    return {
        type: types.ABOUT_US_GET,
        about
    }
}
export const getListAdverts = () => {
    return async (dispatch) => {
        return await fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/home/adverts/adverts/0`)
            .then(response => { return response.json() })
            .then(responseJson => {
                dispatch(advertAction(responseJson.adverts));
            });
    }
}
const advertAction = (adverts) => {
    return {
        type: types.LIST_ADVERTS,
        adverts
    }
}