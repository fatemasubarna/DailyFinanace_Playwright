import { Page } from '@playwright/test';
import { Gender, UserModel } from '../userModel/person.model.ts';

export class RegistrationPage {
  constructor(private page: Page) {}

  // Navigate to registration page
  async clickCreateMenu() {
    await this.page.getByRole('link', { name: /register/i }).click();
  }

  // fill up the data

  async fillFirstName(firstName: string) {
    await this.page.getByRole('textbox', { name: /first name/i }).fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.getByRole('textbox', { name: /last name/i }).fill(lastName);
  }

  async fillEmail(email: string) {
    await this.page.getByRole('textbox', { name: /email/i }).fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByRole('textbox', { name: /password/i }).fill(password);
  }

  async fillPhoneNumber(phoneNumber: string) {
    await this.page.getByRole('textbox', { name: /phone number/i }).fill(phoneNumber);
  }

  async fillAddress(address: string) {
    await this.page.getByRole('textbox', { name: /address/i }).fill(address);
  }

  // Gender radio buttons (no accessible labels on page)
  async selectGender(gender: Gender) {
    const radios = this.page.locator('input[type="radio"]');

    if (gender === Gender.Male) {
      await radios.first().check();
    } else {
      await radios.nth(1).check();
    }
  }

  // Terms & Conditions checkbox (no accessible label)
  async acceptTermsAndConditions() {
    await this.page.locator('input[type="checkbox"]').check();
  }

  async clickCreateUser() {
    await this.page.getByRole('button', { name: /register/i }).click();
  }

  // Full registration workflow
  async createUser(user: UserModel) {
    await this.clickCreateMenu();
    await this.fillFirstName(user.firstName);
    await this.fillLastName(user.lastName);
    await this.fillEmail(user.email);
    await this.fillPassword(user.password);
    await this.fillPhoneNumber(user.phoneNumber);
    await this.fillAddress(user.address);
    await this.selectGender(user.gender);

    if (user.acceptTerms) {
      await this.acceptTermsAndConditions();
    }

    await this.clickCreateUser();
  }
}
