import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { reportIssue, getAllIssues } from "../controllers/issue.controllers.js";

const router = Router();

// For reporting an issue
router.route("/report").post(
    upload.fields([
        {
            name:"image",
            maxCount:1
        }
    ]),
    reportIssue
);

// For getting all issues
// router.route("/issues").get(getAllIssues);
router.route("/").get(getAllIssues);


export default router;