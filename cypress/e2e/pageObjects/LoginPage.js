const ORANGEHRM_LOGO = ".orangehrm-login-branding"
const USERNAME_FIELD = "[name='username']"
const PASSWORD_FIELD = "[name='password']"
const LOGIN_BUTTON = ".oxd-button"
const ALERT_MESSAGE_ERROR = ".oxd-alert"

class LoginPage {
    visit() {
        cy.visit('')
    }
    getOrangeHRMLogo() {
        return cy.get(ORANGEHRM_LOGO)
    }
    getUsernameField() {
        return cy.get(USERNAME_FIELD)
    }
    getPasswordField() {
        return cy.get(PASSWORD_FIELD)
    }
    getLoginButton() {
        return cy.get(LOGIN_BUTTON)
    }
    getAlertMessageError() {
        return cy.get(ALERT_MESSAGE_ERROR)
    }
}

export default LoginPage