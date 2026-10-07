Feature: Complete Order E2E

  Scenario: Registered user validates product in cart

    Given user logs in successfully
    When user navigates to products page
    And user searches for "Blue Top"
    And user opens the searched product
    And user sets the product quantity to 2
    And user adds the product to the cart
    And user opens the cart
    Then the product should be displayed with correct quantity and price