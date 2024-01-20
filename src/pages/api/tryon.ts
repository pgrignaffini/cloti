import type { NextApiHandler } from "next";
import axios from "axios";
import { getAuthenticationHeader } from "~/utils/auth";

type RequestTryonBody = {
  garments: {
    bottoms?: string;
    tops?: string;
  };
  modelId: string;
};

const handler: NextApiHandler = async (req, res) => {
  const data = req.body as RequestTryonBody;
  console.log("data", data);
  const response = await axios.post(
    "https://api.revery.ai/console/v1/request_tryon",
    data,
    {
      headers: getAuthenticationHeader(true),
    },
  );

  return res.status(200).json(response.data);
};

export default handler;
