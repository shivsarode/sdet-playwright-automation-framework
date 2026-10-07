Feature: Product Category Filtering

  Scenario: User filters products by Women Dress category

    Given user opens automation exercise website for product filtering
    When user navigates to products page for filtering
    And user selects Women Dress category
    Then filtered products should be displayed