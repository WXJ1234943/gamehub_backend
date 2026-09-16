import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const CryptoJS = require('crypto-js')

const AES_KEY = CryptoJS.enc.Utf8.parse('gamehub2026sec!!')

export function aesDecrypt(encrypted) {
  const decrypted = CryptoJS.AES.decrypt(encrypted, AES_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

export function aesEncrypt(data) {
  const encrypted = CryptoJS.AES.encrypt(data, AES_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}
