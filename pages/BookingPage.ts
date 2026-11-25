import { Page, Locator, expect } from "@playwright/test";

export class BookingPage {
    readonly page: Page;
    readonly fullName: Locator;
    readonly email: Locator;
    readonly phoneNumber: Locator;
    readonly confirmBooking: Locator;
    readonly confirmationHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fullName = page.getByLabel("Full Name*");
        this.email = page.getByLabel("Email*");
        this.phoneNumber = page.getByLabel("Phone Number*");
        this.confirmBooking = page.getByRole("button", { name: "Confirm Booking" });
        this.confirmationHeading = page.getByRole("heading", { name: "Booking Confirmed!" });
    }

    async fillDetails(fullName: string, email: string, phoneNumber: string) {
        await this.fullName.fill(fullName);
        await this.email.fill(email);
        await this.phoneNumber.fill(phoneNumber);
    }

    async confirm() {
        await this.confirmBooking.click();
    }

    async getBookingReference(): Promise<string> {
        await expect(this.confirmationHeading).toBeVisible();
        const confirmationText = await this.page.locator("main").innerText();
        const bookingRefMatch = confirmationText.match(/Booking Ref\s+([A-Z]+-[A-Z0-9]+)/);
        expect(bookingRefMatch).not.toBeNull();
        return bookingRefMatch![1];
    }
}
