import clientPromise from '../../lib/mongodb'

export default async function handler(req : any, res: any) {
  const client = await clientPromise;
  const db = client.db("technical-test");
  switch (req.method) {
    case "DELETE":
      let object = req.body;
      let post = await db.collection("appointments").deleteOne({owner: object.owner});
      res.json(post);
      break;
    case "PUT":
      let {_id, ...object2} = req.body;
      let post2 = await db.collection("appointments").updateOne({id: object2.id}, {$set : object2}, { upsert: true });
      res.json(post2);
      break;
    case "POST":
      let bodyObject = req.body;
      try {

      let myPost = await db.collection("appointments").insertOne(bodyObject);

      return myPost.ops[0];
    } catch (e) { console.log(e)}

      break;
    case "GET":
      const allPosts = await db.collection("appointments").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}