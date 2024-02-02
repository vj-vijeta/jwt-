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
  
  
