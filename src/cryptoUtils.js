// ================================================================
// TEXT ENCODER
// ================================================================
const enc = new TextEncoder();
const dec = new TextDecoder();

// ================================================================
// PBKDF2
// ================================================================
export async function deriveKey(password, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// ================================================================
// ENCRYPT
// ================================================================
export async function encryptFile(arrayBuffer, password, originalFilename) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await deriveKey(password, salt);

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    arrayBuffer
  );

  const encryptedBytes = new Uint8Array(ciphertext);

  // --- filename handling ---
  const filenameBytes = enc.encode(originalFilename);
  const filenameLength = filenameBytes.length;

  // 2 bytes to store filename length
  const header = new Uint8Array(2);
  header[0] = (filenameLength >> 8) & 0xff;
  header[1] = filenameLength & 0xff;

  // final format
  const result = new Uint8Array(
    16 + 12 + 2 + filenameLength + encryptedBytes.length
  );

  let offset = 0;
  result.set(salt, offset);
  offset += 16;
  result.set(iv, offset);
  offset += 12;
  result.set(header, offset);
  offset += 2;
  result.set(filenameBytes, offset);
  offset += filenameLength;
  result.set(encryptedBytes, offset);

  return result;
}

// ================================================================
// DECRYPT
// ================================================================
export async function decryptFile(encryptedBytes, password) {
  let offset = 0;

  const salt = encryptedBytes.slice(offset, offset + 16);
  offset += 16;

  const iv = encryptedBytes.slice(offset, offset + 12);
  offset += 12;

  // filename length (uint16)
  const filenameLength =
    (encryptedBytes[offset] << 8) | encryptedBytes[offset + 1];
  offset += 2;

  // filename bytes
  const filenameBytes = encryptedBytes.slice(offset, offset + filenameLength);
  const originalName = dec.decode(filenameBytes);
  offset += filenameLength;

  // ciphertext starts at offset
  const ciphertext = encryptedBytes.slice(offset);

  const key = await deriveKey(password, salt);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  return {
    originalName,
    data: new Uint8Array(decrypted),
  };
}
