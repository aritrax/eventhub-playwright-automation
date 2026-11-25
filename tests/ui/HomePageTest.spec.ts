import { test, expect } from "../../fixtures/testFixtures";

test("H-01 Logged-in user opens the home page" , async({page}) =>
{
    await page.goto("/")
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/") ;
    await expect(page.getByRole('link', { name: 'EventHub' })).toBeVisible() ;
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'My Bookings' })).toBeVisible();
} )

test("H-02 Featured Events section loads" , async({page}) =>
{
    await page.goto("/")
    await expect (page.getByTestId("event-card").first()).toBeVisible() 
} )

test("H-03 Event card content" , async({homePage}) =>
{
    await homePage.validEventContent();
} )

test("H-05 Click Browse Events →" , async({page, homePage}) =>
{
    await homePage.clickbrowserEvent()
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/events") ; 
    await expect (page.getByTestId("event-card").first()).toBeVisible() ;
} )

test("H-06 Click My Bookings" , async({page, homePage}) =>
{
    await homePage.clickMyBookings() ;
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings") ; 
} )