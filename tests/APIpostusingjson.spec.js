import { test, expect } from '@playwright/test';
import bookingData from '../testdata/bookingData.json';

test('Create Booking using JSON file', async ({ request }) => {

  const response = await request.post(
    'https://restful-booker.herokuapp.com/booking',
    {
      data: bookingData
    }
  );

  // Verify status code
  expect(response.status()).toBe(200);

  // Get response JSON
  const responseBody = await response.json();

  console.log('Booking Response:', responseBody);

  // Verify booking ID
  expect(responseBody.bookingid).toBeDefined();

  // Verify booking details
  expect(responseBody.booking.firstname).toBe(bookingData.firstname);
  expect(responseBody.booking.lastname).toBe(bookingData.lastname);
  expect(responseBody.booking.totalprice).toBe(bookingData.totalprice);
  expect(responseBody.booking.depositpaid).toBe(bookingData.depositpaid);

  // Verify booking dates
  expect(responseBody.booking.bookingdates.checkin)
    .toBe(bookingData.bookingdates.checkin);

  expect(responseBody.booking.bookingdates.checkout)
    .toBe(bookingData.bookingdates.checkout);
});