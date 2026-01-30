import {test , expect, Page} from '@playwright/test';
import { ItemPage} from '../pages/ItemPage.pom.ts';
import { getLatestUser } from '../utils/utils.ts';
import { ItemModel, Month} from '../userModel/item.model.ts';
import { generateRandomNumber } from '../utils/utils.ts';
import { faker } from '@faker-js/faker';

test.describe('User Registration', () => {

    test('should register a new user successfully', async ({ page }) => {
        // 1️⃣ Navigate to app
        await page.goto('/');
        // 2️⃣ Create page object
        const itemPage = new ItemPage(page);

        // 3️⃣ Test data
       const item: ItemModel = {
  itemName: faker.commerce.productName(),
  quantity: generateRandomNumber(1, 5),
  amount: faker.commerce.price({ min: 10, max: 5000, dec: 2 }),
  purchaseDate: faker.date.past().toISOString().split('T')[0],
  month: Month.January,
  remarks: faker.lorem.sentence(),
};

await itemPage.createItem(item);

        // // 4️⃣ Act: perform registration
        // await registrationPage.createUser(user);
        // saveJSONData(user, './resources/users.json');

        // // 5️⃣ Assert: check registration success
        // await expect(
        //     page.getByText(/registration successful|success/i)
        // ).toBeVisible();


    });

});