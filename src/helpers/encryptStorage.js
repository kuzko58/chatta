import jwt from 'jsonwebtoken';

const key =
  process.env.REACT_APP_JWT_SECRET;

export const encryptStorage = (name, value) => {
  localStorage.setItem(name, jwt.sign(value, key, { expiresIn: '30m' }));
};

export const decryptStorage = (name) => {
  return jwt.verify(localStorage.getItem(name), key, (err, decoded) => {
    if (err) {
      localStorage.removeItem(name);
      return null;
    }
    const { username, password } = decoded;
    return { username, password };
  });
};