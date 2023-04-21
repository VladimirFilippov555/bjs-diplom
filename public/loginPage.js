'use strict'

const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    const loginCallback = (response)=> {
        if(response.success === true) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    }
    ApiConnector.login(data, loginCallback);
}

userForm.registerFormCallback = (data)=>{
    const registerCallback = (response)=> {
        if(response.success === true) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error)
        }
    }
    ApiConnector.register(data, registerCallback);
}