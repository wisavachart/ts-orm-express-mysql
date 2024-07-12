import expres from "express";
import { ErrorHandler } from "../../utils/Errorhandler";
import { AuthorsController } from "../controller/AuthorsController";

const authorsController = new AuthorsController();
const router = expres.Router();

router.get("/", ErrorHandler.handlerError(authorsController.getAuthors));
router.get("/:id", ErrorHandler.handlerError(authorsController.getAuthor));
router.post("/", ErrorHandler.handlerError(authorsController.create));

export default router;
