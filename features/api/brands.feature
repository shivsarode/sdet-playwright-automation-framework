Feature: Brands API

  Scenario: Get all brands successfully
    When user sends GET request to all brands API
    Then brands API response status should be 200
    And brands API response should contain brands
    And brands API response should contain valid brand details

  Scenario: Verify brands response content type
    When user sends GET request to all brands API
    Then brands API response status should be 200
    And brands API response content type should be "text/html"

  Scenario: Verify brands response time
    When user sends GET request to all brands API
    Then brands API response should be received within 3000 milliseconds