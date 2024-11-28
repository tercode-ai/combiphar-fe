import cryptojs from 'crypto-js';

const secretKey = 'secretkey2024';
const iv = cryptojs.enc.Hex.parse('00000000000000000000000000000000');
//(should ideally be securely generated but consistent for this case)

function encrypt(role: string): string {
  const encrypted = cryptojs.AES.encrypt(
    role,
    cryptojs.enc.Utf8.parse(secretKey),
    {
      iv: iv,
      mode: cryptojs.mode.CBC,
      padding: cryptojs.pad.Pkcs7
    }
  );
  return encrypted.toString();
}

function decrypt(encrypted: string): string | null {
  try {
    const decrypted = cryptojs.AES.decrypt(
      encrypted,
      cryptojs.enc.Utf8.parse(secretKey),
      {
        iv: iv,
        mode: cryptojs.mode.CBC,
        padding: cryptojs.pad.Pkcs7
      }
    );
    return decrypted.toString(cryptojs.enc.Utf8);
  } catch (error) {
    return null;
  }
}

export { encrypt, decrypt };
