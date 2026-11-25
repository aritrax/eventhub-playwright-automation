import { test, expect } from "../../fixtures/testFixtures";

const invalidInputs = [
  { id: "B-08a", field: "name",  name: "",             email: "test.student@example.com", phone: "9876543210", error: "Name must be at least 2 chars" },
  { id: "B-08b", field: "email", name: "Test Student", email: "abc",                      phone: "9876543210", error: "Enter a valid email" },
  { id: "B-08c", field: "phone", name: "Test Student", email: "test.student@example.com", phone: "123",        error: "Enter a valid 10-digit phone" },
];

test.describe("Booking form validation", () => {
  for (const data of invalidInputs) {
    test(`${data.id} invalid ${data.field} is rejected`, async ({ page, eventPage, bookingPage }) => {
      await page.goto("/events");
      const card = await eventPage.getEventCard("Hollywood Monsoon Night — Los Angeles");
      await card.getByRole("link", { name: "Book Now" }).click();

      await bookingPage.fillDetails(data.name, data.email, data.phone);
      await bookingPage.confirm();

      // 1. the error is shown
      await expect(page.getByText(data.error)).toBeVisible();
      // 2. we are still on the booking page, and no confirmation appeared
      await expect(page).toHaveURL(/\/events\/\d+/);
      await expect(bookingPage.bookingRef).toBeHidden();
    });
  }
});

test("B-09a quantity cannot exceed available seats", async ({ page, homePage, adminPage, eventPage, bookingPage }) => {
  const eventTitle = `Two Seat Event ${Date.now()}`;
  await homePage.gotoAdminManageEvent();
  await adminPage.createNewEventAdminForm(eventTitle, 2);
  await expect(page.getByText("Event created!")).toBeVisible();

  await page.goto("/events");
  const card = await eventPage.getEventCard(eventTitle);
  await card.getByRole("link", { name: "Book Now" }).click();

  await expect(bookingPage.ticketCount).toHaveText("1");

  await bookingPage.plusButton.click();
  await expect(bookingPage.ticketCount).toHaveText("2");

  await expect(bookingPage.plusButton).toBeDisabled();

  await bookingPage.plusButton.click({ force: true });
  await expect(bookingPage.ticketCount).toHaveText("2");
});