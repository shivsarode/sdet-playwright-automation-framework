Feature: Register and Login Flow

  Scenario: User registration and login flow

    Given user opens website
    When user signs up with new email
    And user creates account
    And user logs out
    And user logs in with same credentials
    Then user should be logged in successfully