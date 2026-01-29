const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Import database configuration
const { sequelize, testConnection } = require('./config/database');

// Import models
const Project = require('./models/Project');
const Client = require('./models/Client');
const Contact = require('./models/Contact');
const Subscriber = require('./models/Subscriber');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', database: 'SQLite' });
});

// PROJECT ROUTES
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    const projectData = {
      name: req.body.name,
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : null
    };
    const project = await Project.create(projectData);
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (project.image) {
      const imagePath = path.join(__dirname, project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await project.destroy();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

// CLIENT ROUTES
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await Client.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error: error.message });
  }
});

app.post('/api/clients', upload.single('image'), async (req, res) => {
  try {
    const clientData = {
      name: req.body.name,
      designation: req.body.designation,
      description: req.body.description,
      rating: req.body.rating || 5,
      image: req.file ? `/uploads/${req.file.filename}` : null
    };
    const client = await Client.create(clientData);
    res.status(201).json({ message: 'Client created successfully', client });
  } catch (error) {
    res.status(400).json({ message: 'Error creating client', error: error.message });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    if (client.image) {
      const imagePath = path.join(__dirname, client.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await client.destroy();
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error: error.message });
  }
});

// CONTACT ROUTES
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['submittedAt', 'DESC']]
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const contact = await Contact.create({
      fullName: req.body.fullName,
      email: req.body.email,
      mobile: req.body.mobile,
      city: req.body.city
    });
    res.status(201).json({ message: 'Contact submitted successfully', contact });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting contact', error: error.message });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.destroy();
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});

// SUBSCRIBER ROUTES
app.get('/api/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.findAll({
      order: [['subscribedAt', 'DESC']]
    });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscribers', error: error.message });
  }
});

app.post('/api/subscribe', async (req, res) => {
  try {
    const existingSubscriber = await Subscriber.findOne({ 
      where: { email: req.body.email } 
    });
    
    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        existingSubscriber.status = 'active';
        existingSubscriber.subscribedAt = new Date();
        await existingSubscriber.save();
        return res.json({ message: 'Welcome back! Subscription reactivated', subscriber: existingSubscriber });
      }
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    
    const subscriber = await Subscriber.create({ email: req.body.email });
    res.status(201).json({ message: 'Subscribed successfully', subscriber });
  } catch (error) {
    res.status(400).json({ message: 'Error subscribing', error: error.message });
  }
});

app.delete('/api/subscribers/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findByPk(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    await subscriber.destroy();
    res.json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscriber', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Initialize Database and Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Sync all models with database (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synchronized');
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`💾 Database: SQLite (database.sqlite)`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
