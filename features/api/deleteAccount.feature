Feature: Delete User Account API

  Scenario: Delete user account successfully
    When user sends DELETE request to delete account API with valid credentials
    Then delete account API should return response code 200
    And delete account API should contain account deleted message

  Scenario: Delete user account with invalid credentials
    When user sends DELETE request to delete account API with invalid credentials
    Then delete account API should return response code 404
    And delete account API should contain account not found message

  Scenario: Delete user account without email
    When user sends DELETE request to delete account API without email
    Then delete account API should return response code 400
    And delete account API should contain missing email message

  Scenario: Delete user account without password
    When user sends DELETE request to delete account API without password
    Then delete account API should return response code 400
    And delete account API should contain missing password message