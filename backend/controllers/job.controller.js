import mongoose from "mongoose";
import { Job } from "../models/job.model.js";

// ✅ Create Job
export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId
        } = req.body;

        const userId = req.id; // set in middleware

        // Validation
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({ message: "Invalid companyId", success: false });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId (check authentication)", success: false });
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error("Job creation error:", error);
        return res.status(400).json({
            message: "Failed to create a new job.",
            error: error.message
        });
    }
};

// ✅ Get All Jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "Jobs not found", success: false });
        }

        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.error("Get all jobs error:", error);
        return res.status(400).json({ message: "Failed to get jobs", error: error.message });
    }
};

// ✅ Get Job by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid jobId", success: false });
        }

      

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({ success: true, job });
    } catch (error) {
        console.error("Get job by id error:", error);
        return res.status(400).json({ message: "Failed to get job", error: error.message });
    }
};

// ✅ Get Jobs by Logged-in Admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return res.status(400).json({ message: "Invalid userId", success: false });
        }

        const jobs = await Job.find({ created_by: adminId }).populate({path:'company', createdAt:-1});

        if (!jobs) {
            return res.status(404).json({ message: "No jobs found for this admin", success: false });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};
