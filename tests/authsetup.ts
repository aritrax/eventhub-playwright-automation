import { test as setup, expect } from '../fixtures/testFixtures'

const authFile = '.auth/user.json'

setup('authenticate', async ({ loginPage, page }) => {
  await loginPage.validLogin()
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

  await page.context().storageState({ path: authFile })
})