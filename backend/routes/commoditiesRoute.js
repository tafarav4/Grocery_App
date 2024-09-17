import express from 'express';
import { Commodity } from '../models/commodityModel.js';

const router = express.Router();

// Route for saving a new commodity
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.quantity ||
            !request.body.cost
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, quantity, cost',
            });
        }
        const newCommodity = {
            name: request.body.name,
            quantity: request.body.quantity,
            units: request.body.units,
            cost: request.body.cost,
            expiration: request.body.expiration,
            category: request.body.category,
        };

        const commodity = await Commodity.create(newCommodity);

        return response.status(201).send(commodity);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route for getting all commodities from the database
router.get('/', async (request, response) => {
    try {
        const commodities = await Commodity.find({});

        return response.status(200).json({
            count: commodities.length,
            data: commodities
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting one commodity from the database
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        
        const commodity = await Commodity.findById(id);

        return response.status(200).json(commodity);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.quantity ||
            !request.body.cost
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, quantity, cost',
            });
        }

        const { id } = request.params;

        const result = await Commodity.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Item not found' });
        }

        return response.status(200).send({ message: 'Item updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Commodity.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Item not found' });
        }

        return response.status(200).send({ message: 'Item deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;