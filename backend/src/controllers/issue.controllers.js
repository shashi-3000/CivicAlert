import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Issue } from "../models/issue.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const reportIssue = asyncHandler(async (req, res) => {
    const { name, contact, email, location, type, description } = req.body;

    if (!location || !type || !description) {
        throw new ApiError(400, "Location, type, and description are required.");
    }

    const issueFile = req.files?.image;
    if (!issueFile || issueFile.length === 0) {
        throw new ApiError(400, "Image is required.");
    }

    const issueLocalPath = issueFile[0].path;
    const issue = await uploadOnCloudinary(issueLocalPath);
    if (!issue) {
        throw new ApiError(400, "Failed to upload image.");
    }

    const savedIssue = await Issue.create({
        name,
        contact,
        email,
        location,
        type,
        description,
        image: issue.secure_url,
    });

    return res.status(201).json(
        new ApiResponse(201, {savedIssue}, "Issue registered successfully.")
    );
});


const getAllIssues = asyncHandler(async (req, res) => {
    const allIssues = await Issue.find();

    if (!allIssues || allIssues.length === 0) {
        throw new ApiError(404, "No issues found.");
    }

    return res.status(200).json(
        new ApiResponse(200, { allIssues }, "All issues fetched successfully.")
    );
});




export{
    reportIssue,
    getAllIssues,
    
}