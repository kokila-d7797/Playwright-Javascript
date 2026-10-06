import { test, expect } from '@playwright/test';

test('Create and Delete Booking using Token', async ({ request }) => {

    //Generate Authentication Token
    const authResponse = await request.post(
        'https://restful-booker.herokuapp.com/auth',
        {
            data: {
                username: 'admin',
                password: 'password123'
            }
        }
    );
    expect(authResponse.status()).toBe(200);
    const authBody = await authResponse.json();
    const token = authBody.token;
    console.log('Token:', token);
    expect(token).toBeDefined();

    //Create Booking
    const createResponse = await request.post(
        'https://restful-booker.herokuapp.com/booking',
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            data: {
                firstname: 'Sharma',
                lastname: 'Kajal',
                totalprice: 500,
                depositpaid: true,
                bookingdates: {
                    checkin: '2026-10-10',
                    checkout: '2026-10-15'
                },
                additionalneeds: 'Breakfast'
            }
        }
    );

    expect(createResponse.status()).toBe(200);
    const createBody = await createResponse.json();
    console.log('Created Booking:', createBody);

    // Get the newly created booking ID
    const bookingId = createBody.bookingid;
    console.log('Booking ID:', bookingId);
    expect(bookingId).toBeDefined();

    //Delete Booking using Token
    const deleteResponse = await request.delete(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                "Cookie": `token=${token}`
            }
        }
    );
    console.log('Delete Status:', deleteResponse.status());
    expect(deleteResponse.status()).toBe(201);

    //Get the deleted user
    const getresponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                "Cookie": `token=${token}`
            }
        }
    );
    console.log('GET Deleted User Response Status:', getresponse.status());
    await expect(getresponse.status()).toBe(404);
    console.log('GET Deleted User Response Status Text:', getresponse.statusText());
    await expect(getresponse.statusText()).toContain('Not Found');
});