Feature: End-to-end account lifecycle

  Scenario: New user registers, verifies account creation, logs in, and deletes the account
    Given user opens website
    When user signs up with new email
    And user creates account
    And user logs out
    And user logs in with same credentials
    Then user should be logged in successfully
    When user deletes the account
    Then account deletion message should be displayed
