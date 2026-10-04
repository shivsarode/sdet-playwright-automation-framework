Feature: Cart Quantity Verification

  Scenario: User verifies product quantity in cart
    Given user launches the application
    When user navigates to the products section
    And user selects the first product to view details
    And user sets the product quantity to 2
    And user adds the product to the cart
    And user opens the cart
    Then the product quantity should be 2