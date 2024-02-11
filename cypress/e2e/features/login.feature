@Login

Feature: Login Page

    Background:
        Given User already on login Page

    @Positive
    Scenario: User successfully login with valid credential
        When User fill username field with valid username
        And User fill password field with valid password
        And Click login button
        Then User success login and redirected to dashboard page
    
    @Negative
    Scenario: User login with invalid password
        When User fill username field with valid username
        And User fill password field with invalid password
        And Click login button
        Then User didn't sign in using invalid password
        And Invalid credential notification visible