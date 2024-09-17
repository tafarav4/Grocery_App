import mongoose from "mongoose";

const commoditySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        units: {
            type: String,
            required: false,
        },
        cost: {
            type: Number,
            required: true,
        },
        expiration: {
            type: Date,
            required: false,
        },
        category: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Commodity = mongoose.model('Commodity', commoditySchema);
