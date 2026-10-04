Feature: Cart Total Price Verification

  Scenario: User verifies product total price in cart
    Given user launches the application
    When user navigates to the products section
    And user adds a product to the cart for price verification
    And user opens the cart for price verification
    Then the product price should be displayed
    And the product quantity should be displayed
    And the total price should be calculated correctly