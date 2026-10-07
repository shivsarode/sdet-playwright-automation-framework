Feature: Products API

  Scenario: Get all products successfully
    When user sends GET request to all products API
    Then products API response status should be 200
    And products API response should contain products
    And products API response should contain valid product details

  Scenario: Verify products response content type
    When user sends GET request to all products API
    Then products API response status should be 200
    And products API response content type should be "text/html"

  Scenario: Verify products response time
    When user sends GET request to all products API
    Then products API response should be received within 3000 milliseconds