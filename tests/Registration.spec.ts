import { test, expect, Page } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.pom.ts';
import { Gender, UserModel } from '../userModel/person.model.ts';
import { faker } from '@faker-js/faker';
import { generateRandomNumber, saveJSONData } from '../utils/utils.ts';

test.describe.serial(  "Admin Activity" , ()=> {

    let page : Page;

    test.beforeAll( async({browser}) => {

        page = await browser.newPage();

    } )


    test.afterAll( async()=> {
        await page.close();
    } )


test.describe('User Registration', () => {

    test('should register a new user successfully', async ({ page }) => {
        // 1️⃣ Navigate to app
        await page.goto('/');
        // 2️⃣ Create page object
        const registrationPage = new RegistrationPage(page);

        // 3️⃣ Test data
        const user: UserModel = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email:'user'+ generateRandomNumber(100, 999)+'@gmail.com',
            password: faker.internet.password(),
            phoneNumber: `017${faker.string.numeric(8)}`, // Bangladesh-style
            address: faker.location.streetAddress() + ', Dhaka, Bangladesh',
            gender: Gender.Male,
            acceptTerms: true,
        };

        // 4️⃣ Act: perform registration
        await registrationPage.createUser(user);
        saveJSONData(user, './resources/users.json');

        // 5️⃣ Assert: check registration success
        await expect(
            page.getByText(/registration successful|success/i)
        ).toBeVisible();


    });

});
});
