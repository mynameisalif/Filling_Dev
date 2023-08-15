export const secret  =  "de832f33-eb39-491a-acae-290b5c97ebb5"
export const encrypt = (message, key) => {
  let ciphertext = "";
  for (let i = 0; i < message.length; i++) {
    let c = message.charCodeAt(i);
    let k = key.charCodeAt(i % key.length);
    ciphertext += String.fromCharCode((c + k) % 256);
  }
  return ciphertext;
};

export const decrypt = (ciphertext, key) => {
  let message = "";
  for (let i = 0; i < ciphertext.length; i++) {
    let c = ciphertext.charCodeAt(i);
    let k = key.charCodeAt(i % key.length);
    message += String.fromCharCode((c - k + 256) % 256);
  }
  return message;
};
