import { test, expect } from "../../fixtures/testFixtures";

test("TC02 Create a new event as admin (UI)" , async({page , homePage, adminPage}) =>
{
    const eventTitle = `Test Event ${Date.now()}`;
    await homePage.gotoAdminManageEvent();
    await adminPage.createNewEventAdminForm(eventTitle) ;
    await expect (page.getByText("Event created!")).toBeVisible() ;
} )

test("BK-01 Book a ticket end to end @smoke", async ({ page, homePage, adminPage, eventPage, bookingPage, myBookingsPage }) => {
  const eventTitle = `BK-01 Test Event ${Date.now()}`;
  let seatsBefore: number;
  let bookingRef: string;

  await test.step("Create the event", async () => {
    await homePage.gotoAdminManageEvent();
    await adminPage.createNewEventAdminForm(eventTitle);
    await expect(page.getByText("Event created!")).toBeVisible();
  });

  await test.step("Find the event and note the seat count", async () => {
    await page.goto("/events");
    await eventPage.getEventCard(eventTitle);
    seatsBefore = await eventPage.getSeatCount(eventTitle);
  });

  await test.step("Book one ticket", async () => {
    const card = await eventPage.getEventCard(eventTitle);
    await card.getByRole("link", { name: "Book Now" }).click();
    await expect(page).toHaveURL(/\/events\/\d+/);

    await expect(page.getByText("1", { exact: true }).first()).toBeVisible();
    await bookingPage.fillDetails("Test Student", "test.student@example.com", "9876543210");
    await bookingPage.confirm();
  });

  await test.step("Verify the booking reference", async () => {
    bookingRef = await bookingPage.getBookingReference();
  });

  await test.step("Verify the booking in My Bookings", async () => {
    await myBookingsPage.openFromBookingConfirmation();
    await myBookingsPage.verifyBooking(bookingRef, eventTitle);
  });

  await test.step("Verify the seat count dropped by 1", async () => {
    await page.goto("/events");
    expect(await eventPage.getSeatCount(eventTitle)).toBe(seatsBefore - 1);
  });
});

