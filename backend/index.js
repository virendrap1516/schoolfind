
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import schoolRoutes from './routes/schoolRoutes.js';
import { initDb } from './databaseconnection/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5000"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


initDb().then(() => {
  console.log('Database initialized');
}).catch(err => {
  console.error('Database initialization failed:', err);
});

// API Routes
app.use('/api/schools', schoolRoutes);


const frontendPath = path.join(__dirname, '../frontend/dist');
console.log(frontendPath);
app.use(express.static(frontendPath));



app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
}); 


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
