import {Page , Locator} from '@playwright/test' 

export class LoginPage
{
    page : Page ;
    userEmail : Locator ;
    userPassword : Locator ;
    signinButton : Locator ;
    registerButton : Locator ;

    constructor(page:Page)
    {
        this.page = page ;
        this.userEmail = page.getByPlaceholder("you@email.com") ;
        this.userPassword = page.getByPlaceholder("••••••") ;
        this.signinButton = page.getByRole("button" , {name : "Sign In"}) ;
        this.registerButton = page.getByRole("link" , {name : "Register"}) ;
    }

    async validLogin()
    {
        await this.page.goto("/") ;
        await this.userEmail.fill(process.env.VALID_EMAIL!) ;
        await this.userPassword.fill(process.env.VALID_PASSWORD!) ;
        await this.signinButton.click() ;
    }

    async validEmailWrongPassword()
    {
        await this.page.goto("/") ;
        await this.userEmail.fill(process.env.VALID_EMAIL!) ;
        await this.userPassword.fill("WRONG PASSWORD") ;
        await this.signinButton.click() ;
    }

    async unregisteredEmailLogin()
    {
        await this.page.goto("/") ;
        await this.userEmail.fill("unregistered@gmail.com") ;
        await this.userPassword.fill("ANY PASSWORD") ;
        await this.signinButton.click() ;
    }

    async blankLogin()
    {
        await this.page.goto("/") ;
        await this.userEmail.fill("") ;
        await this.userPassword.fill("") ;
        await this.signinButton.click() ;
    }

    async invalidEmail(invalidEmails: string)
    {
        await this.page.goto("/");
        await this.userEmail.fill(invalidEmails) ;
        await this.userPassword.fill("") ;
        await this.signinButton.click() ;
    }

    async registerPage()
    {
        await this.page.goto("/");
        await this.registerButton.click() ;
    }
}