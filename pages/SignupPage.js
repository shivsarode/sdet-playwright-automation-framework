class SignupPage {
  constructor(page) {
    this.page = page;

    this.loginLink = 'a[href="/login"]';
    this.signupName = '[data-qa="signup-name"]';
    this.signupEmail = '[data-qa="signup-email"]';
    this.signupBtn = '[data-qa="signup-button"]';

    this.gender = '#id_gender1';
    this.password = '#password';

    this.days = '#days';
    this.months = '#months';
    this.years = '#years';

    this.firstName = '#first_name';
    this.lastName = '#last_name';
    this.address = '#address1';
    this.country = '#country';
    this.state = '#state';
    this.city = '#city';
    this.zipcode = '#zipcode';
    this.mobile = '#mobile_number';

    this.createAccountBtn = '[data-qa="create-account"]';
    this.continueBtn = '[data-qa="continue-button"]';
  }

  async openLogin() {
    await this.page.click(this.loginLink);
  }

  async signup(name, email) {
    await this.page.fill(this.signupName, name);
    await this.page.fill(this.signupEmail, email);
    await this.page.click(this.signupBtn);
  }

  async fillAccountDetails(password) {
    await this.page.click(this.gender);
    await this.page.fill(this.password, password);

    await this.page.selectOption(this.days, '10');
    await this.page.selectOption(this.months, '5');
    await this.page.selectOption(this.years, '1995');

    await this.page.fill(this.firstName, 'Shivam');
    await this.page.fill(this.lastName, 'Sarode');
    await this.page.fill(this.address, 'Pune');
    await this.page.selectOption(this.country, 'India');
    await this.page.fill(this.state, 'MH');
    await this.page.fill(this.city, 'Pune');
    await this.page.fill(this.zipcode, '411001');
    await this.page.fill(this.mobile, '9999999999');

    await this.page.click(this.createAccountBtn);
    await this.page.click(this.continueBtn);
  }
}

module.exports = SignupPage;