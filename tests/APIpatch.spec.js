const { test, expect } = require('@playwright/test');

test('PATCH API Request', async ({ request }) => {

  const response = await request.patch('https://jsonplaceholder.typicode.com/posts/3',
    {
      data: {
        title: 'Updated title'
      }
    }
  );

  // Status validation
  expect(response.status()).toBe(200);

  // Response successful validation
  expect(response.ok()).toBeTruthy();

  // Status text validation
  expect(response.statusText()).toBe('OK');

  // Content-Type validation
  expect(response.headers()['content-type'])
    .toContain('application/json');

  // Convert response to JSON
  const responseBody = await response.json();

  console.log(responseBody);

  // Property validation
  expect(responseBody).toHaveProperty('id');
  expect(responseBody).toHaveProperty('title');
  expect(responseBody).toHaveProperty('body');

  // Updated field validation
  expect(responseBody.title).toBe('Updated title');

  // ID validation
  expect(responseBody.id).toBe(3);

});