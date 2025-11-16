// ============ PBKDF2: Password → AES-256 Key ====================
export async function deriveKey(password, salt) {
  const enc = new TextEncoder();

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

// ============ Encrypt File (AES-GCM + PBKDF2) ====================
export async function encryptFile(arrayBuffer, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await deriveKey(password, salt);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    arrayBuffer
  );

  const encryptedBytes = new Uint8Array(encrypted);

  const result = new Uint8Array(
    salt.length + iv.length + encryptedBytes.length
  );

  result.set(salt, 0);
  result.set(iv, salt.length);
  result.set(encryptedBytes, salt.length + iv.length);

  return result;
}

// ============ Decrypt File (AES-GCM + PBKDF2) ====================
export async function decryptFile(encryptedBytes, password) {
  const salt = encryptedBytes.slice(0, 16);
  const iv = encryptedBytes.slice(16, 28);
  const ciphertext = encryptedBytes.slice(28);

  const key = await deriveKey(password, salt);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  return new Uint8Array(decrypted);
}
