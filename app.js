const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const Blog = require('./models/blog');
const Category = require('./models/Category');

app.use(bodyParser.json());

dotenv.config();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=> console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api/auth', authRoutes);

// app.get('/blog', async (req, res) => {
//     // try {
//     //     const blogs = await Blog.find().sort({ createdAt: -1 });
//     //     res.render('index', { blogs });
//     // } catch (err) {
//     //     console.error(err);
//     //     res.status(500).send('Server Error');
//     // }
//     res.render('blog');
// });

app.get('/blog/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id); // Fetch blog by ID

        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        // const category = await Category.find().select('name');
        const categories = await Category.find().distinct('name');

        res.render('blog', { blog, categories });
    } catch (error) {
        res.status(500).send('Server error');
    }
});



app.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).limit(5); // Latest 5 blogs
        const categories = await Category.find().distinct('name'); // Unique categories
        res.render('index', { blogs, categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/login', (req, res) => {
    res.render('login', { message: null });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Routes
// app.get('/login', (req, res) => {
//     res.render('login');
// });

// // Handling the login POST request (you can add more logic here later)
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
    
//     // Log email and password (for now)
//     console.log(`Email: ${email}, Password: ${password}`);

//     // Simulate successful login
//     res.send('Login successful!');
// });