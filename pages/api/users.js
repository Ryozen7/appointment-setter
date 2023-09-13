import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const dir = path.resolve('./public/files').split("\\").join("/")
  const filenames = fs.readdirSync(dir);
  const data = filenames.map(name => ({ path: `${dir}/${name}`}))

  res.status(200).send({data});
}