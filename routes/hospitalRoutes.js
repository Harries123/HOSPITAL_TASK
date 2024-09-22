const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const hospitalDataPath = path.join(__dirname, '../hospital.json');

// Read hospital data
const readHospitals = () => {
    try {
        const data = fs.readFileSync(hospitalDataPath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading hospital data:', error);
        return [];
    }
};

// GET all hospitals
router.get('/', (req, res) => {
    const hospitals = readHospitals();
    res.json(hospitals);
});

// POST a new hospital
router.post('/', (req, res) => {
    const hospitals = readHospitals();
    const newId = hospitals.length ? Math.max(...hospitals.map(h => h.id)) + 1 : 1;
    const newHospital = { id: newId, ...req.body };
    hospitals.push(newHospital);
    fs.writeFileSync(hospitalDataPath, JSON.stringify(hospitals, null, 2));
    res.status(201).json(newHospital);
});

// PUT to update a hospital by ID
router.put('/:id', (req, res) => {
    const hospitals = readHospitals();
    const hospital = hospitals.find(h => h.id === parseInt(req.params.id));
    if (!hospital) return res.status(404).send('Hospital not found');

    Object.assign(hospital, req.body);
    fs.writeFileSync(hospitalDataPath, JSON.stringify(hospitals, null, 2));
    res.json(hospital);
});

// DELETE a hospital by ID
router.delete('/:id', (req, res) => {
    let hospitals = readHospitals();
    hospitals = hospitals.filter(h => h.id !== parseInt(req.params.id));
    fs.writeFileSync(hospitalDataPath, JSON.stringify(hospitals, null, 2));
    res.status(204).send();
});

module.exports = router;
