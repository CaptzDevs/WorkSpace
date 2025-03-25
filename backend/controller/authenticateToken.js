import jwt from 'jsonwebtoken'
import chalk from 'chalk';

const APP_TOKEN_SECRET = process.env.APP_SECRET_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET_KEY

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    console.log(chalk.green("Access Token : "), String(token).substring(0, 10));

    if (!token) return res.status(401).json({ message: 'Access denied' });
  
    jwt.verify(token, APP_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
  
      req.user = user;
      next();
    });
  }



export function authenticateAdminToken(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log(chalk.green("Access Token : "), String(token).substring(0, 10));

  if (!token) return {}

  return  jwt.verify(token, APP_TOKEN_SECRET, (err, user) => {
    if (err) return {}
    return user
  });
  }

