const http = require('http');

function testEndpoint(method, path, body) {
  return new Promise((resolve) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        console.log(`${method} ${path} => ${res.statusCode}`);
        try { console.log(JSON.stringify(JSON.parse(body), null, 2)); }
        catch { console.log(body); }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`${method} ${path} => ERROR: ${e.message}`);
      resolve();
    });

    if (data) req.write(data);
    req.end();
  });
}

(async () => {
  // Test 1: Health check
  await testEndpoint('GET', '/', null);

  // Test 2: Login with seeded HR account
  await testEndpoint('POST', '/auth/login', {
    email: 'hr@orange.com',
    password: 'SecurePass123!@#',
  });

  // Test 3: Signup as candidate
  await testEndpoint('POST', '/auth/signup', {
    email: 'test-candidate@test.com',
    firstName: 'Test',
    lastName: 'Candidate',
    password: 'TestPassword123!@#',
  });
})();
