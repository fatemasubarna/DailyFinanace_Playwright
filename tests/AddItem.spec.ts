import { test, expect } from '@playwright/test';
import { ItemPage } from '../pages/ItemPage.pom';
import { LoginPage } from '../pages/LoginPage.pom';
import { getLatestUser } from '../utils/utils';
import { ItemModel, Month } from '../userModel/item.model';
import { generateRandomNumber } from '../utils/utils';
import { faker } from '@faker-js/faker';

test.describe('Add Item Tests', () => {

  test('should login, add 2 items, and verify they appear in the item list', async ({ page }) => {
    // ===== STEP 1: LOGIN =====
    await page.goto('/');
    
    const latestUser = getLatestUser('./resources/users.json');
    const loginPage = new LoginPage(page);
    
    await loginPage.login(latestUser.email, latestUser.password);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    console.log('✅ Logged in as:', latestUser.email);

    // ===== STEP 2: ADD 2 ITEMS =====
    const itemPage = new ItemPage(page);
    const addedItems: string[] = [];

    const testData = [
      { month: Month.January, category: 'Electronics' },
      { month: Month.February, category: 'Groceries' },
    ];

    for (const data of testData) {
      const item: ItemModel = {
        itemName: faker.commerce.productName(),
        quantity: generateRandomNumber(1, 5),
        amount: faker.commerce.price({ min: 10, max: 5000, dec: 2 }),
        purchaseDate: faker.date.past().toISOString().split('T')[0],
        month: data.month,
        remarks: `${data.category} - ${faker.lorem.sentence()}`,
      };

      await itemPage.createItem(item);
      addedItems.push(item.itemName);
      await page.waitForTimeout(2000);

      console.log(`✅ Item added (${data.category}):`, item.itemName);
    }

    // ===== STEP 3: VERIFY 2 ITEMS ARE IN THE LIST =====
    expect(addedItems.length).toBe(2);
    console.log('✅ Total items added:', addedItems.length);

    await page.waitForTimeout(1000);

    for (const itemName of addedItems) {
      await expect(
        page.getByText(itemName, { exact: false })
      ).toBeVisible({ timeout: 10000 });
      console.log('✅ Item verified in list:', itemName);
    }

    console.log('✅ All items successfully verified in the item list!');
  });
});