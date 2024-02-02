function urlBase64Encode(str) {
    // Convert the string to Base64
    let base64 = btoa(str);
    // Make the Base64 string URL-safe
    return base64.replace('+', '-').replace('/', '_').replace(/=+$/, '');
  }
  
  function generateJWTSignature(header, payload, secretKey) {
    const encodedHeader = urlBase64Encode(JSON.stringify(header));
    const encodedPayload = urlBase64Encode(JSON.stringify(payload));
  
    const signingInput = encodedHeader + '.' + encodedPayload;
  
    // Convert the secret key to a Uint8Array
    const keyBytes = new TextEncoder().encode(secretKey);
  
    // Use the Web Crypto API to create an HMAC-SHA256 signature
    return crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign'])
      .then((key) => crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput)))
      .then((signature) => urlBase64Encode(String.fromCharCode.apply(null, new Uint8Array(signature))));
  }
  

  function fetchJWTTokens() {
    const secretKey = "enter the secrete key here";
  
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
  
    const payload = {
      "id": "65b77dbd49672454f497cb50",
      "host": "edu-initiatives.proctoring.app",
      "username": "admin",
      "nickname": null,
      "role": "student",
      "provider": null,
      "group": null,
      "exp": 1706706900,
      "iat": 1706699376,
      "identifier": "1234567890",
      "template": "bqjfehqfkh"
    };
  
    generateJWTSignature(header, payload, secretKey)
      .then((signature) => {
        const token = `${urlBase64Encode(JSON.stringify(header))}.${urlBase64Encode(JSON.stringify(payload))}.${signature}`;
        console.log(token);
        document.getElementById('jwt-token').innerText = token;
      })
      .catch((error) => console.error(error));
  }
  
  // Call the function when the script is loaded
  fetchJWTTokens();
