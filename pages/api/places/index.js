// import dbConnect from "../../../db/connect";
// import Place from "../../../db/models/Place";
// import clientPromise from "../lib/mongodb";

import clientPromise from "../../../db/mongodb";

export default async (req, res) => {
  // ----- GET ------------------------
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("tourio-app");

      const places = await db.collection("places").find({}).toArray();
      return res.status(200).json(places);
    } catch (e) {
      console.error(e);
    }
    return res.status(404);
  }

  // ----- Post ------------------------
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("tourio-app");
      console.log(req.body);
      const results = await db.collection("places").insertOne(req.body);
      console.log(results);
      return res.status(200).json(results);
    } catch (e) {
      console.error(e);
    }
  }
};

// export default async function handler(request, response) {
//   await dbConnect();
//   if (request.method === 'GET') {
//        const places = await Place.find();
//     return response.status(200).json(places);
//   }
//   // return response.status(200).json(db_places);
// }

// --- scot --------
//
// import dbConnect from "../../../db/connect";
// import Mix from "../../../db/models/Mix";

// export default async function handler(request, response) {
//   await dbConnect();

//   if (request.method === "GET") {
//     const mixes = await Mix.find();
//     return response.status(200).json(mixes);
//   }

//   if (request.method === "POST") {
//     try {
//       const mixData = request.body;
//       await Mix.create(mixData);

//       response.status(201).json({ status: "Joke created" });
//     } catch (error) {
//       response.status(400).json({ error: error.message });
//     }
//   }
// }
