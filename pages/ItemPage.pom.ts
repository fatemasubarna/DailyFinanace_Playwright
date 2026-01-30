import { Page } from '@playwright/test';
import { ItemModel } from '../userModel/item.model';

export class ItemPage {
  constructor(private page: Page) {}
  // Navigate to Add item page
  async clickAddCost() {
    await this.page.getByRole('button', { name: /Add Cost/i }).click();
  }
// Fill the data
  async fillItemName(itemName: string) {
    await this.page.getByRole('textbox', { name: /Item Name/i }).fill(itemName);
  }
//   async clickIncreaseQuantity() {
//    await this.page.getByRole('button', { name: /\+/i }).click();
//   }
//    async clickDecreaseQuantity() {
//    await this.page.getByRole('button', { name: /-/i }).click();
//   }

async clickIncreaseQuantity(times: number = 1) {
  const plusBtn = this.page.getByRole('button', { name: '+' });
  for (let i = 0; i < times; i++) {
    await plusBtn.click();
  }
}

async clickDecreaseQuantity(times: number = 1) {
  const minusBtn = this.page.getByRole('button', { name: '-' });
  for (let i = 0; i < times; i++) {
    await minusBtn.click();
  }
}

async fillAmount(amount: string) {
    await this.page.getByRole('spinbutton', { name: /Amount/i }).fill(amount);
  }
  async clickPurchaseDate() {
    await this.page.getByLabel(/Purchase Date/i).click();
  }
  async fillMonth(month: string) {
    await this.page.getByRole('combobox', { name: /Month/i }).fill(month);
  }
  async fillRemarks(remarks: string) {
    await this.page.getByRole('textbox', { name: /Remarks/i }).fill(remarks);
  }

// Submit and Reset buttons
  async clickSubmit() {
    await this.page.getByRole('button', { name: /Submit/i }).click();
  }
  async clickrReset() {
    await this.page.getByRole('button', { name: /Reset/i }).click();
  }
   async createItem(item: ItemModel) {
  await this.clickAddCost();
  await this.fillItemName(item.itemName);

  // set quantity from model
  if (item.quantity > 0) {
    await this.clickIncreaseQuantity(item.quantity);
  }

  await this.fillAmount(item.amount);
  await this.clickPurchaseDate(item.purchaseDate);
  await this.fillMonth(item.month);
  await this.fillRemarks(item.remarks);
  await this.clickSubmit();
}

      
     


  
}