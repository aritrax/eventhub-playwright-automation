import {Page , Locator, expect} from '@playwright/test' 

export class HomePage
{
    page : Page ;
    logout : Locator ;
    eventCard  : Locator ;
    browserEvent : Locator ;
    mybookings : Locator ;
    adminButton : Locator ;
    adminManageEvent : Locator ;

    constructor(page:Page)
    {
        this.page = page ;
        this.logout = page.getByTestId("logout-btn") ;
        this.eventCard = page.getByTestId("event-card") ;
        this.browserEvent = page.getByRole('link', { name: 'Browse Events →' }) ;
        this.mybookings = page.getByRole('button', { name: 'My Bookings' }) ;
        this.adminButton = page.getByRole('button', { name: 'Admin' }) ;
        this.adminManageEvent = page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }) ;
    }

    async logOut()
    {
        await this.logout.click() ;
    }

    async validEventContent()
    {
        await this.page.goto("/") ;
        await expect(this.eventCard.first()).toBeVisible();
        const eventCount = await this.eventCard.count();

        for (let i = 0; i < eventCount; i++)
        {
            const card = this.eventCard.nth(i);
            const title = card.locator("h3");
            const dateAndLocation = card.locator("span.line-clamp-1");
            const price = card.locator("p");
            const seatsAvailable = card.getByText(/\d[\d,]*\s+seats?\s+(?:left!?|available)/i);
            const bookNow = card.getByRole("link", { name: "Book Now" });

            await expect(title).toBeVisible();
            await expect(title).toHaveText(/\S/);
            await expect(dateAndLocation).toHaveCount(2);
            await expect(dateAndLocation.nth(0)).toBeVisible();
            await expect(dateAndLocation.nth(0)).toHaveText(/\S/);
            await expect(dateAndLocation.nth(1)).toBeVisible();
            await expect(dateAndLocation.nth(1)).toHaveText(/\S/);
            await expect(price).toBeVisible();
            await expect(price).toHaveText(/^\$\s?[\d,]+(?:\.\d{2})?$/);
            await expect(seatsAvailable).toBeVisible();
            await expect(bookNow).toBeVisible();
            await expect(bookNow).toHaveText("Book Now");
        }
    }

    async clickbrowserEvent()
    {
        await this.page.goto("/") ;
        await this.browserEvent.click() ;
    }

    async clickMyBookings()
    {
        await this.page.goto("/") ;
        await this.mybookings.click() ;
    }

    async gotoAdminManageEvent()
    {
        await this.page.goto("/") ;
        await this.adminButton.click() ;
        await this.adminManageEvent.click() ;
    }

}