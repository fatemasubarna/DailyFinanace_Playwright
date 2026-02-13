import { Page } from '@playwright/test';
import { UserModel } from '../userModel/person.model';
export class ResetPasswordPage {
  constructor(private page: Page) {}
  
  // Navigate to Forget password page
  async clickResetItHere() {
    await this.page.getByRole('link', { name: /Reset it here/i }).click();

  }

  // fillup the data 

  async fillEmail(email: string) {
    await this.page.getByRole('textbox', { name: /Email/i }).fill(email);
  }

  async clickSendResetLink() {
    await this.page.getByRole('button', { name: /SEND RESET LINK/i }).click();
  }


  // Fill new password field
  async fillNewPassword(newPassword: string) {
    await this.page.getByRole('textbox', { name: /New Password/i }).fill(newPassword);
  }

  // Fill confirm password field
  async fillConfirmPassword(confirmPassword: string) {
    await this.page.getByRole('textbox', { name: /Confirm Password/i }).fill(confirmPassword);
  }

  // Click reset/submit button
  async clickResetPasswordButton() {
    await this.page.getByRole('button', { name: /RESET PASSWORD/i }).click();
  }

  // Wait for page to load
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async resetPasswordLinkSend( email: string){
        await this.clickResetItHere();
        await this.fillEmail(email);
        await this.clickSendResetLink();
        await this.waitForPageLoad();

    }
//Complete password reset workflow
  async resetPassword(confirmPassword: string, newPassword: string) {
    await this.fillNewPassword(newPassword);
    await this.fillConfirmPassword(confirmPassword);
    await this.clickResetPasswordButton();
    await this.waitForPageLoad();
  }

}