import {Page , Locator} from '@playwright/test' 

export class HomePage
{
    page : Page ;
    logout : Locator ;

    constructor(page:Page)
    {
        this.page = page ;
        this.logout = page.getByTestId("logout-btn")
    }

    async logOut()
    {
        await this.logout.click() ;
    }
}