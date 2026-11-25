import {Page , Locator} from '@playwright/test' 

export class AdminPage
{
    page : Page ;
    eventTittle : Locator ;
    eventDescribtion : Locator ;
    eventCity : Locator ;
    eventVenue : Locator ;
    eventDate : Locator ;
    eventPrice : Locator ;
    eventSeat : Locator ;
    addEvent : Locator ;


    constructor(page:Page)
    {
        this.page = page ;
        this.eventTittle = page.getByPlaceholder("Event title") ;
        this.eventDescribtion = page.getByPlaceholder("Describe the event…") ;
        this.eventCity = page.getByLabel('City') ;
        this.eventVenue = page.getByLabel("Venue*") ;
        this.eventDate = page.getByLabel('Event Date & Time') ;
        this.eventPrice = page.getByLabel('Price ($)') ;
        this.eventSeat = page.getByLabel('Total Seats')
        this.addEvent = page.getByRole('button', { name: '+ Add Event' }) ;

    }

    async createNewEventAdminForm(eventTitle: string, totalSeats = 50)
    {
        await this.eventTittle.fill(eventTitle)  ;
        await this.eventDescribtion.fill("Playwright test event") ;
        await this.eventCity.fill("Test City") ;
        await this.eventVenue.fill("Test Venue") ;
        await this.eventDate.fill("2027-12-31T10:00") ;
        await this.eventPrice.fill("100") ;
        await this.eventSeat.fill(String(totalSeats)) ;
        await this.addEvent.click() ;
    }
}