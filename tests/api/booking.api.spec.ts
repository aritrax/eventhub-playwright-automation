import { test, expect } from "@playwright/test";

const API_URL = "https://api.eventhub.rahulshettyacademy.com/api";

test("B-09b API rejects booking more tickets than available seats", async ({ request }) => {
  const email = process.env.VALID_EMAIL;
  const password = process.env.VALID_PASSWORD;

  if (!email || !password) {
    throw new Error("VALID_EMAIL and VALID_PASSWORD must be set to run booking API tests");
  }

  const loginResponse = await request.post(`${API_URL}/auth/login`, {
    data: { email, password },
  });
  expect(loginResponse.status()).toBe(200);
  const { token } = await loginResponse.json();
  expect(token).toBeTruthy();

  const headers = { Authorization: `Bearer ${token}` };
  let eventId: number | undefined;

  try {
    const createEventResponse = await request.post(`${API_URL}/events`, {
      headers,
      data: {
        title: `API Seat Limit ${Date.now()}`,
        description: "Temporary event for booking API validation",
        category: "Conference",
        venue: "Test Venue",
        city: "Test City",
        eventDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        price: 100,
        totalSeats: 2,
      },
    });

    expect(createEventResponse.status()).toBe(201);
    const createdEvent = await createEventResponse.json();
    eventId = createdEvent.data.id;
    expect(eventId).toBeTruthy();

    const bookingResponse = await request.post(`${API_URL}/bookings`, {
      headers,
      data: {
        eventId,
        customerName: "Test Student",
        customerEmail: "test.student@example.com",
        customerPhone: "+1-555-555-0100",
        quantity: 3,
      },
    });

    expect(bookingResponse.status()).toBe(400);
    const bookingError = await bookingResponse.json();
    expect(bookingError.success).toBe(false);
    expect(bookingError.error).toMatch(/only 2 seat/i);

    const eventResponse = await request.get(`${API_URL}/events/${eventId}`, { headers });
    expect(eventResponse.status()).toBe(200);
    const event = await eventResponse.json();
    expect(event.data.availableSeats).toBe(2);
  } finally {
    if (eventId !== undefined) {
      const deleteResponse = await request.delete(`${API_URL}/events/${eventId}`, { headers });
      expect(deleteResponse.status()).toBe(200);
    }
  }
});
