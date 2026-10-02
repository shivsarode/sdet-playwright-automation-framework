Feature: Product Search Feature

  Scenario: User searches for a product successfully

    Given user opens automation exercise website
    When user navigates to products page
    And user searches for "Blue Top"
    Then searched products should be displayed
    And product "Blue Top" should be visible in search results