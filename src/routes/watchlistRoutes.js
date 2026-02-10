import express from "express";
import { addToWatchlist, removeFromWatchlist, updateWatchlist } from "../controller/watchlistController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidator.js";

const router = express.Router();

router.use(authMiddleware)

router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);
router.delete("/:id", removeFromWatchlist);
router.put('/:id', updateWatchlist);

export default router;