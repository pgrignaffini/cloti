import type { NextApiHandler } from "next";
import axios from "axios";
import { getAuthenticationHeader } from "~/utils/auth";

const handler: NextApiHandler = async (_, res) => {
  const result = await axios.get(
    "https://api.revery.ai/console/v1/get_filtered_garments",
    {
      headers: getAuthenticationHeader(),
    },
  );
  return res.status(200).json(result.data);
};

export default handler;
