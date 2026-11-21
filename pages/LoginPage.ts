import {Page , Locator} from '@playwright/test' 

export class LoginPage
{
    page : Page ;
    userEmail : Locator ;
    userPassword : Locator ;
    signinButton : Locator ;


    constructor(page:Page)
    {
        this.page = page ;
        this.userEmail = page.getByPlaceholder("you@email.com") ;
        this.userPassword = page.getByPlaceholder("••••••") ;
        this.signinButton = page.getByRole("button" , {name : "Sign In"}) ;
    }

    async validLogin()
    {
        await this.page.goto("/") ;
        await this.userEmail.fill(process.env.VALID_EMAIL!) ;
        await this.userPassword.fill(process.env.VALID_PASSWORD!) ;
        await this.signinButton.click() ;

    }
}