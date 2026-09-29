import {test, expect} from '@playwright/test';
test ("API GET Request", async ({request}) => {
    const response = await request.get("https://jsonplaceholder.typicode.com/posts/1/comments");

    //validating the response status
    const responseStatus = await response.status();
    console.log("Response Status:", responseStatus);
    await expect(response.status()).toBe(200);

    //validating the response status text
    const responsestatustext=await response.statusText();
    console.log("Response Status Text:", responsestatustext);
    await expect(response.statusText()).toBe("OK");

    //validating the length of the response body
    const responseBodyJson = await response.json();
    expect(responseBodyJson.length).toBe(5);

    //validating particular userId
    const particularuser = responseBodyJson.find(
        user => user.id === 3
    );
    console.log('Particular user:', particularuser);

    //validating it exists
    expect(particularuser).toBeDefined();

    //validating the email of the particular user
    expect(particularuser.email).toContain("Nikita");

    //validating the property of the particular user
    for (const key in particularuser) {
        if (particularuser.hasOwnProperty(key)) {
            console.log(`Property '${key}': ${particularuser[key]}`);
        }
    }
});