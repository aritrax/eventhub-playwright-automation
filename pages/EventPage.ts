import {Page , Locator, expect} from '@playwright/test' 

export class EventPage
{
    page : Page ;
    eventCard  : Locator ;


    constructor(page:Page)
    {
        this.page = page ;
        this.eventCard = page.getByTestId("event-card") ;
    }

    async getEventCard(eventTitle : string)
    {
        const targetCard = this.eventCard.filter({ hasText: eventTitle }).first();
        await expect(targetCard).toBeVisible({ timeout: 10000 });
        return targetCard ;
    }

    async getSeatCount(eventTitle : string)
    {
        const card = await this.getEventCard(eventTitle);
        const seatsText = await card.getByText(/\d[\d,]*\s+seats?\s+(?:left!?|available)/i).innerText();
        const match = seatsText.match(/\d[\d,]*/);
        if (!match) {
            throw new Error(`Could not parse seat count from: ${seatsText}`);
        }
        return parseInt(match[0].replace(/,/g, ""), 10);
    }

}