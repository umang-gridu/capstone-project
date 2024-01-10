import { staticFileUri } from "../../views/contants.js";

const userFile = async function (req, res) {
  return res.sendFile(staticFileUri + "/index.html");
};

export { userFile };
