import { test, expect } from "@playwright/test";

const LOGIN_URL = "https://api.eventhub.rahulshettyacademy.com/api/auth/login";

test.describe("Login API", () => {
  test("L-09 valid credentials return 200 and a token @smoke", async ({ request }) =>
    {
        const response = await request.post(LOGIN_URL, {
        data: { email: process.env.VALID_EMAIL, password: process.env.VALID_PASSWORD },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeTruthy(); 
  });

  test("L-10 wrong password returns 400", async ({ request }) => {
    const response = await request.post(LOGIN_URL, {
      data: { email: process.env.VALID_EMAIL, password: "wrong-password" },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.token).toBeUndefined();
  });

  for (const [field, payload] of [
    ["email", { password: "x" }],
    ["password", { email: "a@b.com" }],
  ] as const) {
    test(`L-11 missing ${field} returns a validation error`, async ({ request }) => {
      const response = await request.post(LOGIN_URL, { data: payload });
      expect([400, 422]).toContain(response.status()); 
    });
  }
});