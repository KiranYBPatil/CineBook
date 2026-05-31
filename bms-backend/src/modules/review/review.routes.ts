import { Router } from "express";
import * as ReviewController from "./review.controller";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/movie/:movieId", ReviewController.getReviewsByMovie);
router.post("/", verifyToken, ReviewController.addReview);

export default router;
