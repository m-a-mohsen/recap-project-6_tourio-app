/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// import { ObjectId } from "mongodb";
// const ObjectId = require("mongodb")
// var ObjectId = require("mongodb").ObjectId;

// Select the database to use.
use("tourio-app");

// Insert a few documents into the sales collection.
// db.getCollection("places").findOne({ _id: "64e7739ea38da8d43bdcfb8b" });
// db.getCollection("places").find({"_id": new ObjectId("64e7739ea38da8d43bdcfb8b")});

//-----GET one with comments -----
// db.getCollection("places").aggregate([
//   { $match: { _id: new ObjectId("64e7739ea38da8d43bdcfb8f") } },
//   {
//     $lookup: {
//       from: "comments",
//       localField: "comments",
//       foreignField: "_id",
//       as: "comments",
//     },
//   },
// ])

//-----update one place -----
db.getCollection('places').updateOne(
  { _id: new ObjectId("65610cb8f2fcc18d1e0417fc") },
  {
    $set: {
      name: "hi",
      image: "",
      location: "low",
      mapURL: "go",
      description: "fooooo"
    }
  }
)


// // Run a find command to view items sold on April 4th, 2014.
// const salesOnApril4th = db.getCollection('sales').find({
//   date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
// }).count();

// // Print a message to the output window.
// console.log(`${salesOnApril4th} sales occurred in 2014.`);

// // Here we run an aggregation and open a cursor to the results.
// // Use '.toArray()' to exhaust the cursor to return the whole result set.
// // You can use '.hasNext()/.next()' to iterate through the cursor page by page.
// db.getCollection('sales').aggregate([
//   // Find all of the sales that occurred in 2014.
//   { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
//   // Group the total sales for each product.
//   { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
// ]);
