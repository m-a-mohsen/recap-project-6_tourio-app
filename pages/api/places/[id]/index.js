import clientPromise from "../../../../db/mongodb.ts";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;
  // ---- check id ---------
  /*
  check if it is a valid ID
  https://regex-generator.olafneumann.org/
   */
  function useRegex(input) {
    let regex = /[A-Za-z0-9]+/i;
    return regex.test(input);
  }
  if (!useRegex(id)) {
    return res.status(500).json({ error: "no ID" });;
  }
  // ----- GET Handle --------
  if (req.method === "GET") {
    try {
      // console.log(id)
      // console.log('id-object', new ObjectId(id))
      const client = await clientPromise;
      const db = client.db("tourio-app");
      const placeCursorArr = await db.collection("places").aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "comments",
            localField: "comments",
            foreignField: "_id",
            as: "comments",
          },
        },
      ]).toArray();



      const comments = placeCursorArr[0].comments;
      const place = placeCursorArr[0];

      return res.status(200).json({ place, comments });
    } catch (e) {
      console.error(e);
    }
    return res.status(500).json({ error: "didn't find anything 2" });
  }
  // ----- PATCH Handle --------

  if (req.method === "PATCH") {
    console.log(req.query)
    // console.log(id)

    try {
      console.log(req.body)
      const client = await clientPromise;
      const db = client.db("tourio-app");
      const results = await db
        .collection("places").updateOne(
          { _id: new ObjectId(id) },
          { $set: req.body }
        )

      return res.status(200).send(results);
    } catch (e) {
      console.error(e);
    }
    return res.status(500).send({ error: "server error" })
  }
  // ----- Delete Handle --------

  if (req.method === "DELETE") {
    // console.log(req.query)
    // console.log(id)

    try {

      const client = await clientPromise;
      const db = client.db("tourio-app");
      const results = await db
        .collection("places").deleteOne({ _id: new ObjectId(id) })
      console.log(results)
      return res.status(200).send(results);
    } catch (e) {
      console.error(e);
    }
  }


  // ----- comment Post ------------------------
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db("tourio-app");
      console.log(req.body)
      const commentResults = await db.collection("comments").insertOne(req.body)
      const insertedId = await commentResults.insertedId

      const updatePlace = await db.collection('places').updateOne(

      )
      console.log(commentResults)
      console.log(commentResults.insertedId)
      return res.status(200).json(commentResults);
    } catch (e) {
      console.error(e);
    }
  };



};

// import { db_places } from "../../../../lib/db_places";
// import { db_comments } from "../../../../lib/db_comments";

// export default function handler(request, response) {
//   const { id } = request.query;

//   if (!id) {
//     return;
//   }

//   const place = db_places.find((place) => place._id.$oid === id);
//   const comment = place?.comments;
//   const allCommentIds = comment?.map((comment) => comment.$oid) || [];
//   const comments = db_comments.filter((comment) =>
//     allCommentIds.includes(comment._id.$oid)
//   );

//   if (!place) {
//     return response.status(404).json({ status: "Not found" });
//   }

//   response.status(200).json({ place: place, comments: comments });
// }
