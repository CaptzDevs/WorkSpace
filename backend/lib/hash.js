import { createHash } from 'crypto';

export function hashSHA256(data) {
  return createHash('sha256').update(data).digest('hex');
}

export function hashMD5(data) {
    return createHash('md5').update(data).digest('hex');
}

export function compareWithMD5(password, md5Hash) {
    const md5Password = hashMD5(password).toString()

    return md5Password === md5Hash;
  }
  
  // Function to compare password with SHA-256 hash
export function compareWithSHA256(password, sha256Hash) {
    const sha256Password = hashSHA256(password).toString()
    
    return sha256Password === sha256Hash;
  }


const hashCode = {
    hashMD5,
    compareWithMD5,
    hashSHA256,
    compareWithSHA256,
}

export default hashCode


