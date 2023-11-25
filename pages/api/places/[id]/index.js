import clientPromise from "../../../../db/mongodb.ts";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

  const { id } = req.query;
  if (!id) {
    return;
  }
  if (req.method === "GET") {
    try {
      console.log(id)
      console.log('id-object', new ObjectId(id))
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

      res.json({ place, comments });
    } catch (e) {
      console.error(e);
    }
  }
  if (req.method === "PATCH") {
    console.log(req.query)
    // console.log(id)

    try {
      console.log(req.body)
      // const client = await clientPromise;
      // const db = client.db("tourio-app");
      // const results = await db
      //   .collection("places").



      res.status(200).send({ ok: "lets go" });
    } catch (e) {
      console.error(e);
    }
  }
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
