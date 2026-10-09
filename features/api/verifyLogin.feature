Feature: Verify Login API

  Scenario: Verify login with invalid credentials
    When user sends POST request to verify login API with invalid credentials
    Then verify login API response status should be 200
    And verify login API response should contain user not found message

  Scenario: Verify login with missing email parameter
    When user sends POST request to verify login API without email parameter
    Then verify login API response status should be 200
    And verify login API response should contain missing parameter message

  Scenario: Verify login with unsupported HTTP method
    When user sends DELETE request to verify login API
    Then verify login API response status should be 200
    And verify login API response should contain method not supported message

    Scenario: Verify login with valid credentials
    When user creates an account and logs in with valid credentials
    Then verify login API response status should be 200
    And verify login API should contain user exists message

  Scenario: Verify login response content type
    When user creates an account and logs in with valid credentials
    Then verify login API response content type should be "text/html"

  Scenario: Verify login response time
    When user creates an account and logs in with valid credentials
    Then verify login API response should be received within 3000 milliseconds