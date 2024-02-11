import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import LoginPage from '../pageObjects/LoginPage'

const loginPage = new LoginPage

// Background:
Given(/^User already on login Page$/, () => {
    loginPage.visit()
    loginPage.getOrangeHRMLogo().should('be.visible')
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    return true;
});

// Scenario: User success login with valid credential
When(/^User fill username field with valid username$/, () => {
    loginPage.getUsernameField().type('Admin')
    return true;
});

When(/^User fill password field with valid password$/, () => {
    loginPage.getPasswordField().type('admin123')
    return true;
});

When(/^Click login button$/, () => {
    loginPage.getLoginButton().click()
    return true;
});

Then(/^User success login and redirected to dashboard page$/, () => {
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
    return true;
});