import { test, expect } from "../../fixtures/testFixtures";
import { LoginPage } from "../../pages/LoginPage";

test.use({ storageState: { cookies: [], origins: [] } })

test("L-01 Login with valid registered email and password" , async({page , loginPage})=>
{
    await loginPage.validLogin() ;
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
})

test("L-02 Valid login, then logout" , async({page, loginPage ,homePage})=>
{
    await loginPage.validLogin() ;
    await homePage.logOut() ;
    await expect(page.getByText("Sign in to EventHub")).toBeVisible() ;
})

test("L-03 Valid email, wrong password" , async({page , loginPage})=>
{
    await loginPage.validEmailWrongPassword() ;
    await expect(page.getByText("Invalid email or password")).toBeVisible() ;
})

test("L-04 Unregistered email, any password" , async({page , loginPage})=>
{
    await loginPage.unregisteredEmailLogin() ;
    await expect(page.getByText("Invalid email or password")).toBeVisible() ;
})

test("L-05 Both fields empty" , async({page , loginPage})=>
{
    await loginPage.blankLogin() ;
    await expect(page.getByText("Enter a valid email")).toBeVisible() ;
    await expect(page.getByText("Password must be at least 6 characters")).toBeVisible() ;
})

test("L-06 Invalid email format" , async({page , loginPage})=>
{
    const invalidEmails = [
        'abc',
        'abc@',
        '@mail.com',
        'a b@mail.com'
    ];

    for(const email of invalidEmails)
    {
        await loginPage.invalidEmail(email) ;
        await expect(page.getByText("Enter a valid email")).toBeVisible() ;
    }
})

test("L-07 Protected page (My Bookings) redirects to login when logged out" , async({page , loginPage})=>
{
    await page.goto("https://eventhub.rahulshettyacademy.com/bookings") ;
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/login") ;
})

test("L-08 Register link navigates to the registration page" , async({page , loginPage})=>
{
    await loginPage.registerPage() ;
    await expect(page.getByText("Create your account")).toBeVisible() ; 
})