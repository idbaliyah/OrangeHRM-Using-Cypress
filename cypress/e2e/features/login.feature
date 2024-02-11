@Login

Feature: Login Page

    Background:
        Given User already on login Page

    Scenario: User success login with valid credential
        When User fill username field with valid username
        And User fill password field with valid password
        And Click login button
        Then User success login and redirected to dashboard page