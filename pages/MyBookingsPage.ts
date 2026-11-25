import { Page, Locator, expect } from "@playwright/test";

export class MyBookingsPage {
    readonly page: Page;
    readonly viewMyBookings: Locator;

    constructor(page: Page) {
        this.page = page;
        this.viewMyBookings = page.getByRole("link", { name: "View My Bookings" });
    }

    async open() {
        await this.page.goto("/bookings");
        await expect(this.page).toHaveURL(/\/bookings/);
    }

    async openFromBookingConfirmation() {
        await this.viewMyBookings.click();
        await expect(this.page).toHaveURL(/\/bookings/);
    }

    getBookingCard(bookingReference: string): Locator {
        return this.page.locator("main").filter({ hasText: bookingReference });
    }

    async verifyBooking(bookingReference: string, eventTitle: string) {
        const card = this.getBookingCard(bookingReference);
        await expect(card).toContainText(bookingReference);
        await expect(card).toContainText(eventTitle);
    }
}
