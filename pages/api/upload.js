import fs from 'fs';
import path from 'path';
const bcrypt = require('bcrypt');

export default async function handler(req, res) {
  
  if (req.method === 'POST'){
    const dir = path.resolve('./public/files').split("\\").join("/");
    const date = new Date().toISOString().replace(/[:.]/g, '-');
    const { email, password } = req.body;
    let data = {...req.body};
    bcrypt.hash(password, 10, function(err, hash) {

      data.password = hash;
      data.confirmPassword = hash;
      data.fileUrl= dir +`${email}-${date}.json`
      fs.writeFileSync(`./public/files/${date}-${email.replace('.','-')}.json`, JSON.stringify(data))
      return res.status(200).json({});
    });
    
  }
  //...
}