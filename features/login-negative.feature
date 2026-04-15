Feature: Invalid Login Validation Flow

Scenario: User tries to login with wrong credentials

Given user navigates to the application
When user navigates to login screen
And user submits incorrect email and password
Then system should display authentication error message