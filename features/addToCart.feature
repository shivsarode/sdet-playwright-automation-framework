Feature: Add to Cart Feature

  Scenario: User adds product to cart
    Given user opens automation exercise website
    When user navigates to products page
    And user adds first product to cart
    Then product should be added to cart successfully