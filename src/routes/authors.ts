import expres from "express";
import { AuthorsController } from "../controller/AuthorsController";
import { FileUploader } from "../middlewares/FileUpoader";
import { ErrorHandler } from "../utils/Errorhandler";

const authorsController = new AuthorsController();
const router = expres.Router();

router.get("/", ErrorHandler.catchErr(authorsController.getAuthors));
router.get("/:id", ErrorHandler.catchErr(authorsController.getAuthor));
router.post(
  "/",
  FileUploader.upload("image", "authors", 2 * 1204 * 1204),
  ErrorHandler.catchErr(authorsController.create)
);
router.put("/:id", ErrorHandler.catchErr(authorsController.create));
router.delete("/:id", ErrorHandler.catchErr(authorsController.delete));

export default router;
