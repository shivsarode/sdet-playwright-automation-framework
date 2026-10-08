Feature: Update User Account API

  Scenario: Update user account successfully
    When user sends PUT request to update account API with valid user data
    Then update account API should return response code 200
    And update account API should contain account updated message

  Scenario: Update user account with invalid credentials
    When user sends PUT request to update account API with invalid credentials
    Then update account API should return response code 404
    And update account API should contain account not found message

  Scenario: Update user account without email
    When user sends PUT request to update account API without email
    Then update account API should return response code 400
    And update account API should contain missing email message

  Scenario: Update user account without password
    When user sends PUT request to update account API without password
    Then update account API should return response code 400
    And update account API should contain missing password message