import { Page } from '@playwright/test';
import { ItemModel } from '../userModel/item.model';

export class ProfilePage {
  constructor(private page: Page) {}
  
  // Navigate to Profile page
  async clickProfileicon() {
    await this.page.locator('button[aria-label="account of current user"]').click();

  }

  async clickProfile() {
    await this.page.getByRole('menuitem', { name: /Profile/i }).click();
  }

  async clickEdit() {
    await this.page.getByRole('button', { name: /EDIT/i }).click();
  }

  async selectImage() {
    await this.page.getByRole('button', { name: /Choose File/i }).click();
  }

  async uploadImage() {
    await this.page.getByRole('button', { name: /UPLOAD IMAGE/i }).click();
  }

  async clickUpdate() {
    await this.page.getByRole('button', { name: /UPDATE/i }).click();
  }

  async clickLogout() {
    await this.page.getByRole('menuitem', { name: /LOGOUT/i }).click();
  }




}