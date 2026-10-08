Feature: Get User Detail By Email API

  Scenario: Get user details successfully
    When user sends GET request to get user detail API with valid email
    Then get user detail API should return response code 200
    And get user detail API should contain valid user details

  Scenario: Verify user detail response fields
    When user sends GET request to get user detail API with valid email
    Then get user detail API should return response code 200
    And get user detail API should contain required user fields

  Scenario: Verify user detail response time
    When user sends GET request to get user detail API with valid email
    Then get user detail API response should be received within 3000 milliseconds

  Scenario: Get user details with invalid email
    When user sends GET request to get user detail API with invalid email
    Then get user detail API should return the actual error response

  Scenario: Get user details without email
    When user sends GET request to get user detail API without email
    Then get user detail API should return the actual error response

  Scenario: Get user details with empty email
    When user sends GET request to get user detail API with empty email
    Then get user detail API should return the actual error response