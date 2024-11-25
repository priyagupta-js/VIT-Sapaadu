const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
const corsOptions = {
    // React frontend address
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST'],
};
app.use(cors(corsOptions));


 // To parse JSON body
app.use(express.json());

const URL = "mongodb+srv://pgupta2024:2024@cluster0.ji3vg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// MongoDB connection
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

// MongoDB User model
const User = mongoose.model('loginInfo', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number:{ type: String, required: true, unique: true },
    regNo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}));

// const Menu = mongoose.model('fooditem', new mongoose.Schema({
//     name: String,
//     price: Number,
//     rating: Number,
//     reviews: Number,
//     description: String,
//     image: String
// }));
// const Menu = mongoose.model('Menu', VitSapaaduSchema);

// const Cafe = mongoose.model('Cafe', new mongoose.Schema({
//     name: String,
//     foodTypes: [String],
// }));


// app.get('/api/cafes', async (req, res) => {
//     try {
//         const cafes = await Cafe.find();
//         res.json(cafes);
//     } catch (error) {
//         console.error('Error fetching cafes:', error);
//         res.status(500).json({ error: 'Error fetching cafes' });
//     }
// });


// Assuming Express and Mongoose setup is already done

app.get('/api/user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.json(user);
    } catch (err) {
        res.status(500).send("Error retrieving user data");
    }
});


// Route to get all food items
// app.get('/api/items', async (req, res) => {
//     try {
//         const items = await Menu.find();
//         res.json(items);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server Error");
//     }
// });

// // Add a new food item (optional, for testing purposes)
// app.post('/api/items', async (req, res) => {
//     try {
//         const { name, price, rating, reviews, description, image } = req.body;
//         const newItem = new Menu({ name, price, rating, reviews, description, image });
//         await newItem.save();
//         res.status(201).json(newItem);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server Error");
//     }
// });


// app.post('/api/items', (req, res) => {
//     const { name, price, rating, reviews, description, image } = req.body;

//     const newFoodItem = new Menu({
//         name,
//         price,
//         rating,
//         reviews,
//         description,
//         image
//     });

//     newFoodItem.save()
//         .then((foodItem) => {
//             res.status(201).json({
//                 message: 'Food item added successfully!',
//                 foodItem
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 message: 'Error adding food item.',
//                 error: error.message
//             });
//         });
// });


// Route for user registration
app.post('/register', async (req, res) => {
    const { name, email,number, regNo, password } = req.body;

    try {
        // Check if the registration number already exists
        const userExists = await User.findOne({ regNo });
        if (userExists) {
            return res.status(400).json({ error: 'Reg. No. already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, number,regNo, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Route for user login
app.post('/login', async (req, res) => {
    const { regNo, password } = req.body;

    try {
        // Find the user by registration number
        const user = await User.findOne({ regNo });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
