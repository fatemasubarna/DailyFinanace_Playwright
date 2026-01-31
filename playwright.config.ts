import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  timeout: 40000,
  retries: 1,
  workers: 1,
  reporter: 'html',

  expect: {
    timeout: 10000,
  },

  use: {
    actionTimeout: 10000,
    baseURL: 'https://dailyfinance.roadtocareer.net/',
    video: "on-first-retry",
    screenshot: "only-on-failure",
    headless: false,
    viewport: null,
    launchOptions: {
      slowMo: 1000,
      args: ['--start-maximized']
    },
    trace: 'on-first-retry',
  },

  projects: [
    // Sequential test execution - Registration → Login → Add Item -> Profile Update
    // {
    //   name: 'registration',
    //   testMatch: 'Registration.spec.ts',
    // },

    {
      name: 'login',
      testMatch: 'Login.spec.ts',
      //dependencies: ['registration'],
    },
    // {
    //   name: 'additem',
    //   testMatch: 'AddItem.spec.ts',
    //   dependencies: ['login'],
    // },

    {
      name: 'profile update',
      testMatch: 'Profile.spec.ts',
      dependencies: ['login'],
    },
    
    // Remove or comment out the chromium project entirely
    // {
    //   name: 'chromium',
    // },
  ],
});