import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Budget from "../models/budget.model.js";





const createBudget = asyncHandler(async (req, res) => {
    const { limit, category, month, year } = req.body;

    if ([limit, category, month, year].some(field => field === undefined)) {
        throw new ApiError(400, "All fields are required")
    }

    // Check if budget already exists for the user, category, month and year
    const existingBudget = await Budget.findOne({
        user: req.user._id,
        category,
        month,
        year
    });

    if (existingBudget) {
        throw new ApiError(400, "Budget already exists for this category and month")
    }

    const budget = await Budget.create({
        user: req.user._id,
        limit,
        category,
        month,
        year
    });

    res.status(201).json(
        new ApiResponse(201, budget, "Budget created successfully")
    )
});

const getBudgets = asyncHandler(async (req, res) => {
    const { month, year,category } = req.query;

    if (!month || !year || !category) {
        throw new ApiError(400, "Month, year and category are required")
    }

    const budget = await Budget.aggregate([
        { $match: {
                user: req.user._id,
                month: parseInt(month),
                year: parseInt(year),
                category: category
            }  
        },
    ]);

    res.status(200).json(
        new ApiResponse(200, budget, "Budgets retrieved successfully")
    )
});

export { createBudget, getBudgets };