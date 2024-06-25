// server/index.js
const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Leonardo',
    database: 'file_management'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const sql = 'INSERT INTO files (name, path) VALUES (?, ?)';
    db.query(sql, [file.originalname, file.path], (err, result) => {
        if (err) {
            console.error('Failed to insert file record:', err);
            return res.status(500).send('Failed to store file information.');
        }
        res.send('File uploaded successfully.');
    });
});

app.get('/files', (req, res) => {
    const sql = 'SELECT * FROM files';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to fetch files:', err);
            return res.status(500).send('Failed to retrieve files.');
        }
        res.json(results);
    });
});

app.delete('/files/:id', (req, res) => {
    const fileId = req.params.id;
    const sql = 'DELETE FROM files WHERE id = ?';
    db.query(sql, [fileId], (err, result) => {
        if (err) {
            console.error('Failed to delete file:', err);
            return res.status(500).send('Failed to delete file.');
        }
        res.send('File deleted successfully.');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
