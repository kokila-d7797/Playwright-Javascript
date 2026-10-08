import {test,expect} from'@playwright/test';

test("POST API Request", async ({request})=> {

    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data:{
            name:"abc",
            password:"xyz123"
            }
    })

    //validating status code
    const statuscode = await response.status();
    console.log('Status Code:', statuscode);
    expect(statuscode).toBe(201);

    //getting response body
    const responsebody = await response.body();
    console.log('Response body:', responsebody);

    //getting reponse in json
    const responsejson = await response.json();
    console.log('Json Response:', responsejson);

    //validating name and password
    expect(responsejson.name).toBe('abc');
    expect(responsejson.password).toBe('xyz123');

    //validating generating id
    expect(responsejson.id).toBeDefined();
    console.log('Response id:', responsejson.id);

});

test("POST API token", async({request})=> {

    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        data:{
            username:'admin',
            password:'password123'
        }
    });

    //getting and validating status code
    const statuscode = await response.status();
    console.log('Status code:', statuscode);
    expect(response.status()).toBe(200);

    //getting response jsone
    const responsejson = await response.json();
    console.log('Response JSON:', responsejson);

    //getting token
    const token = await responsejson.token;
    console.log('Token:',token);
    expect(responsejson.token).toBeDefined();

    //getting status text
    const statustext = await response.statusText();
    console.log('Status Text:', statustext);
    
});