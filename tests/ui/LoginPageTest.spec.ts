import { test, expect } from "../../fixtures/testFixtures";

test.use({ storageState: { cookies: [], origins: [] } })

test("L-01 Login with valid registered email and password" , async({page , loginPage})=>
{
    await loginPage.validLogin() ;
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
})