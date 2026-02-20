// Lightweight AES-GCM encrypt/decrypt utilities using Web Crypto

export type AesGcmEncrypted = {
  iv: Uint8Array;
  ciphertext: Uint8Array;
};

export async function importAesKey(rawKey: BufferSource): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', rawKey, 'AES-GCM', false, [
    'encrypt',
    'decrypt',
  ]);
}

export async function decryptAesGcm(
  key: CryptoKey,
  iv: BufferSource,
  ciphertext: BufferSource,
): Promise<Uint8Array> {
  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext,
  );
  return new Uint8Array(plain);
}

export async function encryptAesGcm(
  key: CryptoKey,
  iv: BufferSource,
  data: BufferSource,
): Promise<Uint8Array> {
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  return new Uint8Array(ct);
}

export function hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/^0x/, '').toLowerCase();
  if (clean.length % 2 !== 0) throw new Error('Invalid hex length');
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.substr(i * 2, 2), 16);
  }
  return out;
}

export function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
