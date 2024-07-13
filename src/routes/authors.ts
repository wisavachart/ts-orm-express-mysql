import expres from "express";
import { AuthorsController } from "../controller/AuthorsController";
import { FileUploader } from "../middlewares/FileUpoader";
import { ErrorHandler } from "../utils/Errorhandler";

const authorsController = new AuthorsController();
const router = expres.Router();

router.get("/", ErrorHandler.handlerError(authorsController.getAuthors));
router.get("/:id", ErrorHandler.handlerError(authorsController.getAuthor));
router.post(
  "/",
  FileUploader.upload("image", "authors", 2 * 1204 * 1204),
  ErrorHandler.handlerError(authorsController.create)
);
router.put("/:id", ErrorHandler.handlerError(authorsController.create));

export default router;
