import { test as base , expect } from "@playwright/test"
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { AdminPage } from "../pages/AdminPage"
import { EventPage } from "../pages/EventPage"
import { BookingPage } from "../pages/BookingPage"
import { MyBookingsPage } from "../pages/MyBookingsPage"


type Fixtures = {
  loginPage: LoginPage
  homePage : HomePage
  adminPage : AdminPage
  eventPage : EventPage
  bookingPage : BookingPage
  myBookingsPage : MyBookingsPage

}


export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },
    adminPage: async ({ page }, use) => {
        await use(new AdminPage(page))
    },
    eventPage: async ({ page }, use) => {
        await use(new EventPage(page))
    },
    bookingPage: async ({ page }, use) => {
        await use(new BookingPage(page))
    },
    myBookingsPage: async ({ page }, use) => {
        await use(new MyBookingsPage(page))
    },
})

export { expect }