Feature: POST All Products List API

  Scenario: POST products list with unsupported method
    When user sends POST request to products list API
    Then products list API response status should be 200
    And products list API should return method not supported response

  Scenario: Verify products list response code
    When user sends POST request to products list API
    Then products list API should return response code 405

  Scenario: Verify method not supported message
    When user sends POST request to products list API
    Then products list API should contain method not supported message

  Scenario: Verify products list response content type
    When user sends POST request to products list API
    Then products list API response content type should be "text/html"

  Scenario: Verify products list response time
    When user sends POST request to products list API
    Then products list API response should be received within 3000 milliseconds

  Scenario: Verify products list response body
    When user sends POST request to products list API
    Then products list API should return the actual error response