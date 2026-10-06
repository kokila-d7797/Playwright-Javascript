import {test,expect} from '@playwright/test';

test ('PUT API Request', async ({request}) => {

    const response = await request.put('https://jsonplaceholder.typicode.com/posts/3',{
        data: { 
            userID: "1a",
            id: "3a",
            title: "testing put request",
            body: "API Automation on put request"
        }
    });
    console.log("Status:",response.status());
    expect(response.status()).toBe(200);

    expect(response.ok()).toBeTruthy();

    expect(response.statusText()).toBe('OK');

    expect (response.headers()['content-type']).toContain('application/json');

    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');

    const responseBody = await response.json();
    console.log('Response Body:', responseBody);

    expect(responseBody).toHaveProperty('userID');
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('title');
    expect(responseBody).toHaveProperty('body');

    expect(responseBody.userID).toBe('1a');
    expect(responseBody.id).toBe(3); //ID cannot be changed as it is the resource identifier of the url

    expect(responseBody.title).toBe('testing put request');

    expect(responseBody.body).toBe('API Automation on put request');

    expect(responseBody.id).toBe(3);

});