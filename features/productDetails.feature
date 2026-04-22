Feature: Product Details Verification

  Scenario: User views product details successfully
    Given user launches the application
    When user navigates to the products section
    And user verifies the products list is displayed
    And user selects the first product to view details
    Then user should see complete product information