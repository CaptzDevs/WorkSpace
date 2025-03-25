import crypto from "crypto-js";
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.TOKEN_SECRET_KEY; // คีย์ 256-bit (ต้องยาว 32 ตัวอักษร)

export const encryptParam = (param) => {
  const iv = crypto.lib.WordArray.random(8); // IV 8 bytes
  const encrypted = crypto.AES.encrypt(param.toString(), crypto.enc.Utf8.parse(secretKey), {
    iv: iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7,
  });

  // รวม IV + CipherText และแปลงเป็น Hexadecimal
  return iv.concat(encrypted.ciphertext).toString(crypto.enc.Hex);
};

export const decryptParam = (encryptedParam) => {
  const encryptedData = crypto.enc.Hex.parse(encryptedParam);
  const iv = encryptedData.clone().words.slice(0, 2); // ดึง IV 8 bytes
  const ciphertext = encryptedData.clone().words.slice(2); // ดึง CipherText

  const decrypted = crypto.AES.decrypt(
    { ciphertext: crypto.lib.WordArray.create(ciphertext) },
    crypto.enc.Utf8.parse(secretKey),
    {
      iv: crypto.lib.WordArray.create(iv),
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    }
  );

  return decrypted.toString(crypto.enc.Utf8);
};