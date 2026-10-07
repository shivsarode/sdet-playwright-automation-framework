Feature: Checkout Validation

  Scenario: Guest user is prompted to login before checkout

    Given user opens automation exercise website
    When user navigates to products page
    And user adds first product to cart
    And user opens cart for checkout
    And user proceeds to checkout
    Then login prompt should be displayed