import crypto from 'crypto';

// Encrypt and decrypt source URLs using AES-256-GCM, to avoid exposing them to clients.
// FILE_TOKEN_SECRET should be a 32-byte key in base64 (recommended) or hex.

type TokenPayload = {
  u: string; // url or path
  exp?: number; // unix seconds
};

function getKeyFromEnv(): Buffer {
  const secret = process.env.FILE_TOKEN_SECRET || '';
  if (!secret) {
    throw new Error('FILE_TOKEN_SECRET is not configured');
  }
  try {
    if (/^[A-Fa-f0-9]+$/.test(secret) && secret.length === 64) {
      return Buffer.from(secret, 'hex');
    }
    // default assume base64
    const key = Buffer.from(secret, 'base64');
    if (key.length !== 32) {
      throw new Error('FILE_TOKEN_SECRET must be 32 bytes (base64 or hex)');
    }
    return key;
  } catch {
    throw new Error('Invalid FILE_TOKEN_SECRET format');
  }
}

export function encryptUrlToToken(url: string, ttlSeconds?: number): string {
  const key = getKeyFromEnv();
  const iv = crypto.randomBytes(12);
  const payload: TokenPayload = { u: url };
  if (ttlSeconds && ttlSeconds > 0) {
    payload.exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  }
  const plaintext = Buffer.from(JSON.stringify(payload), 'utf8');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  // token = base64(iv).base64(ciphertext).base64(tag)
  return [
    iv.toString('base64'),
    ciphertext.toString('base64'),
    tag.toString('base64'),
  ].join('.');
}

export function decryptTokenToUrl(token: string): string {
  const key = getKeyFromEnv();
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid token');
  const [ivB64, ctB64, tagB64] = parts;
  const iv = Buffer.from(ivB64, 'base64');
  const ct = Buffer.from(ctB64, 'base64');
  const tag = Buffer.from(tagB64, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const plain = Buffer.concat([decipher.update(ct), decipher.final()]);
  const json = plain.toString('utf8');
  const payload = JSON.parse(json) as TokenPayload;
  if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
    throw new Error('Token expired');
  }
  return payload.u;
}
