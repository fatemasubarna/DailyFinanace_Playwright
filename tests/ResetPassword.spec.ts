import { test, expect, Page } from '@playwright/test';
import { ResetPasswordPage } from '../pages/ResetPasswordPage.pom.ts';
import { Gender, UserModel } from '../userModel/person.model.ts';
import { faker } from '@faker-js/faker';
import { generateRandomNumber, saveJSONData, getLatestUser } from '../utils/utils.ts';

test.describe('Reset Password', () => {

    test('should reset password successfully', async ({ page, context }) => {
        // 1️⃣ Navigate to website
        await page.goto('/');

        const latestUser : UserModel = getLatestUser("./resources/users.json");
        // 2️⃣ Create page object
        const resetPasswordPage = new ResetPasswordPage(page);
        // send reset password link
       // await resetPasswordPage.resetPasswordLinkSend( latestUser.email );

       await resetPasswordPage.resetPasswordLinkSend( "subornaahamed1122@gmail.com" );
        // 5️⃣ Assert: check reset password success
        await expect(
        page.getByText(/Password reset link sent to your email/i)).toBeVisible()
      

        // Pause for manual email checking
         await page.pause();

    // After clicking email link, you should be on the password reset page
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        console.log('✅ Resumed - on password reset page');
        console.log('Current URL:', page.url());



        // 6️⃣ Reset password
        const newPassword = 'NewPass' + generateRandomNumber(1000, 9999);
        await resetPasswordPage.resetPassword( newPassword , newPassword );

        // 7️⃣ Assert: check password reset success
        await expect(
        page.getByText(/Password reset successfully/i)).toBeVisible();

        // Update the user's password in the JSON file
        latestUser.password = newPassword;
        saveJSONData(latestUser, './resources/users.json');


    });
});