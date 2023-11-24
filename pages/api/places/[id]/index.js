import clientPromise from "../../../../db/mongodb.ts";
import { ObjectId } from "mongodb";
 
export default async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return;
    }
  try {
    const client = await clientPromise;
    const db = client.db("tourio-app");

    const place = await db
      .collection("places")
      .findOne({ _id: new ObjectId(id) });
    console.log(place)

    const comment = place?.comments;
    console.log(typeof comment)
    res.json(place);
  } catch (e) {
    console.error(e);
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
