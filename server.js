const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store for vet consultations
let vetConsultations = [];

// In-memory store for adoptions (simulate interactive adoption process)
let adoptionRequests = [];

// API Endpoints

// Get product data
app.get('/api/products', (req, res) => {
  const products = [
    {id:1, name: "Premium Dog Food", price: 29.99, img: "/images/dog-food.jpg"},
    {id:2, name: "Chew Toys Set (Dog)", price: 15.99, img: "/images/dog-toys.jpg"},
    {id:3, name: "Dog Collar", price: 13.50, img: "/images/dog-collar.jpg"},
    {id:4, name: "Pet First Aid Kit", price: 39.99, img: "/images/first-aid-kit.jpg"},
    {id:5, name: "Dog Leash", price: 12.99, img: "/images/dog-leash.jpg"},
    {id:6, name: "Comfortable Dog Bed", price: 59.99, img: "/images/dog-bed.jpg"},
    {id:7, name: "Premium Cat Food", price: 25.99, img: "/images/cat-food.jpg"},
    {id:8, name: "Cat Scratch Post", price: 22.49, img: "/images/cat-scratch.jpg"},
    {id:9, name: "Cat Collar with Bell", price: 9.99, img: "/images/cat-collar.jpg"},
    {id:10, name: "Cat Toy Set", price: 14.99, img: "/images/cat-toys.jpg"},
    {id:11, name: "Cat Bed Hammock", price: 29.99, img: "/images/cat-bed.jpg"},
    {id:12, name: "Grooming Brush", price: 11.99, img: "/images/grooming-brush.jpg"}
  ];
  res.json(products);
});

// Get volunteers data
app.get('/api/volunteers', (req, res) => {
  const volunteers = [
    {name:"Buddy", role:"Dog Rescuer", img:"/images/volunteers/buddy.jpg"},
    {name:"Molly", role:"Cat Rescuer", img:"/images/volunteers/molly.jpg"},
    {name:"Charlie", role:"Dog Trainer", img:"/images/volunteers/charlie.jpg"},
    {name:"Luna", role:"Cat Specialist", img:"/images/volunteers/luna.jpg"},
    {name:"Max", role:"Veterinarian", img:"/images/volunteers/max.jpg"}
  ];
  res.json(volunteers);
});

// Receive and store vet consultation requests
app.post('/api/vet-consultations', (req, res) => {
  const { petType, petBreed, petAge, symptoms } = req.body;
  if (!petType || !petBreed || !petAge || !symptoms) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  const newConsultation = {
    id: vetConsultations.length + 1,
    petType,
    petBreed,
    petAge,
    symptoms,
    createdAt: new Date()
  };
  vetConsultations.push(newConsultation);
  res.status(201).json({ message: 'Vet consultation request received successfully.', consultation: newConsultation });
});

// Receiving adoption requests
app.post('/api/adopt', (req, res) => {
  const { petId, adopterName, adopterContact } = req.body;
  if (!petId || !adopterName || !adopterContact) {
    return res.status(400).json({ message: 'Missing required adoption information.' });
  }
  // For demo, store adoption request
  const adoptionRequest = {
    id: adoptionRequests.length + 1,
    petId,
    adopterName,
    adopterContact,
    date: new Date()
  };
  adoptionRequests.push(adoptionRequest);
  res.status(201).json({ message: 'Adoption request sent successfully.', adoptionRequest });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server with logging
app.listen(PORT, () => {
  console.log(\`Paw Phillips backend running at http://localhost:\${PORT}\`);
});

