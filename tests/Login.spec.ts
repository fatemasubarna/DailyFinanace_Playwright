
import {test , expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.pom.ts';
import { getLatestUser } from '../utils/utils.ts';
import { UserModel } from '../userModel/person.model.ts';


test.only( "User can Login Successfully" , async ( {page} )=>{

   await page.goto("/");

   const latestUser : UserModel = getLatestUser("./resources/users.json");
    const loginPage = new LoginPage(page);
    await loginPage.login( latestUser.email  , latestUser.password );
    await page.pause();


}  )

