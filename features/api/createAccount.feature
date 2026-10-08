Feature: Create Account API

  Scenario: Create user account successfully
    When user sends POST request to create account API with unique user data
    Then create account API should return response code 201
    And create account API should contain user created message
    And create account API response time should be within 3000 milliseconds

  Scenario: Create account with duplicate email
    When user sends POST request to create account API with existing user email
    Then create account API should return response code 400
    And create account API should contain duplicate email message

  Scenario: Create account without email
    When user sends POST request to create account API without email
    Then create account API should return response code 400
    And create account API should contain missing email message

  Scenario: Create account without password
    When user sends POST request to create account API without password
    Then create account API should return response code 400
    And create account API should contain missing password message

  Scenario: Create account without name
    When user sends POST request to create account API without name
    Then create account API should return response code 400
    And create account API should contain validation failure message

  Scenario: Create account without first name
    When user sends POST request to create account API without first name
    Then create account API should return response code 400
    And create account API should contain validation failure message

  Scenario: Create account without last name
    When user sends POST request to create account API without last name
    Then create account API should return response code 400
    And create account API should contain validation failure message

  Scenario: Create account without country
    When user sends POST request to create account API without country
    Then create account API should return response code 400
    And create account API should contain validation failure message

  Scenario: Create account without zipcode
    When user sends POST request to create account API without zipcode
    Then create account API should return response code 400
    And create account API should contain validation failure message

  Scenario: Create account without mobile number
    When user sends POST request to create account API without mobile number
    Then create account API should return response code 400
    And create account API should contain validation failure message