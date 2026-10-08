Feature: Search Product API

  Scenario: Search product successfully
    When user sends POST request to search product API with "top"
    Then search product API response status should be 200
    And search product API response should contain searched products
    And search product API response should contain valid product details

  Scenario: Verify search product response content type
    When user sends POST request to search product API with "top"
    Then search product API response status should be 200
    And search product API response content type should be "text/html"

  Scenario: Verify search product response time
    When user sends POST request to search product API with "top"
    Then search product API response should be received within 3000 milliseconds