Feature: PUT All Brands List API

  Scenario: Verify unsupported PUT request
    When user sends PUT request to brands list API
    Then brands list API response status should be 200
    And brands list API should return method not supported response

  Scenario: Verify business response code
    When user sends PUT request to brands list API
    Then brands list API should return response code 405

  Scenario: Verify method not supported message
    When user sends PUT request to brands list API
    Then brands list API should contain method not supported message

  Scenario: Verify response content type
    When user sends PUT request to brands list API
    Then brands list API response content type should be "text/html"

  Scenario: Verify response time
    When user sends PUT request to brands list API
    Then brands list API response should be received within 3000 milliseconds

  Scenario: Verify error response body
    When user sends PUT request to brands list API
    Then brands list API should return the actual error response