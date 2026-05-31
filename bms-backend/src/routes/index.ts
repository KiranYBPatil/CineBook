import { Router, Request, Response } from "express";
import movieRoutes from "../modules/movie/movie.route";
import showRoutes from "../modules/show/show.routes";
import theaterRoutes from "../modules/theater/theater.routes";
import bookingRoutes from "../modules/booking/booking.routes"; // ✅ default import
import userRoutes from "../modules/user/user.routes"; // here i got red underline error for "../modules/user/user.routes"
import fs from "fs";
import path from "path";

const router = Router();

router.use("/movies", movieRoutes);
router.use("/shows", showRoutes);
router.use("/theaters", theaterRoutes);
router.use("/bookings", bookingRoutes); 
router.use("/user", userRoutes); // ✅ ADD THIS

// ─── Version endpoint ───────────────────────────────
router.get("/version", (_req: Request, res: Response) => {
  let version = "1.1.0"; // default fallback

  // Try reading VERSION file (written by Jenkins during deployment)
  try {
    const versionFile = path.resolve(__dirname, "../../../VERSION");
    if (fs.existsSync(versionFile)) {
      version = fs.readFileSync(versionFile, "utf-8").trim();
    }
  } catch (_) {
    // ignore - use default
  }

  res.json({
    app: "CineBook",
    version,
    timestamp: new Date().toISOString(),
  });
});

export default router;