import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'

type Message = {
  text: string
}

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<Message>
) {
  const router = useRouter()
  
  let producId = router.query.id;

  response.status(200).json({ text: "Success" })
  response.status(400).json({ text: "Failure" })
}