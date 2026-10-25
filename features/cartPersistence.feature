Feature: Cart Persistence After Page Refresh

  Scenario: Product and quantity remain in the cart after refreshing
    Given user launches the application
    When user navigates to the products section
    And user selects the first product to view details
    And user sets the product quantity to 2
    And user adds the product to the cart
    And user opens the cart
    And user records the cart product name and quantity
    And user refreshes the page and returns to the cart if needed
    Then the same product and quantity should remain in the cart
