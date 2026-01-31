import { test, expect } from '@playwright/test';
import { ProfilePage } from '../pages/ProfilePage.pom';
import { LoginPage } from '../pages/LoginPage.pom';
import { getLatestUser } from '../utils/utils';

test.describe('Add Item Tests', () => {

  test('should login, go to profile settings and upload a profile photo and logout', async ({ page }) => {
    // ===== STEP 1: LOGIN =====
    await page.goto('/');
    
    const latestUser = getLatestUser('./resources/users.json');
    const loginPage = new LoginPage(page);
    
    await loginPage.login(latestUser.email, latestUser.password);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);


    // ===== STEP 2: profile update=====
    const profilePage = new ProfilePage(page);
    
    await profilePage.clickProfileicon();
    await page.waitForTimeout(1000);
    await profilePage.clickProfile();
    await page.waitForTimeout(2000);
    await profilePage.clickEdit();
    await page.waitForTimeout(2000);
    await profilePage.selectImage();
    // Assuming the file input is accessible, set the file path
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      // This action should trigger the file chooser
      profilePage.selectImage(),
    ]);
    await fileChooser.setFiles('./resources/photo.png');
    await page.waitForTimeout(2000);
    await profilePage.uploadImage();
    await page.waitForTimeout(2000);
    await profilePage.clickUpdate();
    await page.waitForTimeout(2000);

    console.log('✅ Profile image uploaded successfully');  


    // ===== STEP 3: LOGOUT =====
    await profilePage.clickProfileicon();
    await page.waitForTimeout(1000);
    await profilePage.clickLogout();
    // await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

  });


})