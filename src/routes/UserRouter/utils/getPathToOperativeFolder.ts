import path from "path";

const getPathToOperativeFolder = () => {
  return path.resolve(__dirname, "./../../../", "static") + "/";
};

export default getPathToOperativeFolder;
