// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET":
      console.log("👍 GET");
      res.json([req.body]);
      break;
    case "POST":
      console.log("👍 POST");
      //res.json([]);
      res.status(200).end();
      break;
    case "PUT":
      console.log("👍 PUT");
      //res.json([req.body]);
      res.status(200).end();
      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
}
