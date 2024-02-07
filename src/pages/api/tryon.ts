import type { NextApiHandler } from "next";
import axios from "axios";
import { getAuthenticationHeader } from "~/utils/auth";

type RequestTryonBody = {
  product_ids: {
    bottoms?: string;
    tops?: string;
  };
  modelId: string;
};

const handler: NextApiHandler = async (req, res) => {
  const data = req.body as RequestTryonBody;

  try {
    const response = await axios.post(
      "https://api.revery.ai/console/v1/request_tryon",
      data,
      {
        headers: getAuthenticationHeader(true),
      },
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export default handler;
