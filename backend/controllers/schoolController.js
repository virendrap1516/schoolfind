


// import { getDb } from '../databaseconnection/db.js';

// export async function addSchool(req, res) {
//   try {
//     const { name, address, city, state, contact, email_id } = req.body;
//     const image = req.file ? req.file.filename : null;

//     const db = getDb();
//     await db.execute(
//       'INSERT INTO schoolss (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       [name, address, city, state, contact, email_id, image]
//     );

//     res.status(201).json({ message: 'School added successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding school', error });
//   }
// }

// export async function getSchools(req, res) {
//   try {
//     const db = getDb();
//     const [rows] = await db.execute('SELECT * FROM schoolss');
//     res.status(200).json(rows);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching schools', error });
//   }
// }

// export async function deleteSchool(req, res) {
//   try {
//     const { id } = req.params;
//     const db = getDb();

//     const [result] = await db.execute('DELETE FROM schoolss WHERE id = ?', [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'School not found' });
//     }

//     res.status(200).json({ message: 'School deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting school', error: error.message });
//   }
// }
  

// export async function editSchool(req, res) {
//   try {
//     const { id } = req.params;
//     const { name, address, city, state, contact, email_id } = req.body;
//     const image = req.file ? req.file.filename : null;

//     const db = getDb();
//     const [result] = await db.execute(
//       `UPDATE schoolss
//        SET name = ?, address = ?, city = ?, state = ?, contact = ?, email_id = ?, image = COALESCE(?, image) 
//        WHERE id = ?`,
//       [name, address, city, state, contact, email_id, image, id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'School not found' });
//     }

//     res.status(200).json({ message: 'School updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating school', error: error.message });
//   }
// }

import { getDb } from '../databaseconnection/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL for image links
const BASE_URL = process.env.BASE_URL || 'https://mini-project-rm2k.onrender.com';

export async function addSchool(req, res) {
  try {
    const { name, address, city, state, contact, email_id } = req.body;
    const image = req.file ? req.file.filename : null;

    const db = getDb();
    await db.execute(
      'INSERT INTO schoolss (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, email_id, image]
    );

    const imageUrl = image ? `${BASE_URL}/uploads/schoolImages/${image}` : null;
    res.status(201).json({ message: 'School added successfully', imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error adding school', error });
  }
}

export async function getSchools(req, res) {
  try {
    const db = getDb();
    const [rows] = await db.execute('SELECT * FROM schoolss');

    const schoolsWithUrl = rows.map(school => ({
      ...school,
      imageUrl: school.image ? `${BASE_URL}/uploads/schoolImages/${school.image}` : null,
    }));

    res.status(200).json(schoolsWithUrl);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schools', error });
  }
}

export async function deleteSchool(req, res) {
  try {
    const { id } = req.params;
    const db = getDb();

    const [result] = await db.execute('DELETE FROM schoolss WHERE id = ?', [id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'School not found' });

    res.status(200).json({ message: 'School deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting school', error: error.message });
  }
}

export async function editSchool(req, res) {
  try {
    const { id } = req.params;
    const { name, address, city, state, contact, email_id } = req.body;
    const image = req.file ? req.file.filename : null;

    const db = getDb();
    const [result] = await db.execute(
      `UPDATE schoolss
       SET name = ?, address = ?, city = ?, state = ?, contact = ?, email_id = ?, image = COALESCE(?, image)
       WHERE id = ?`,
      [name, address, city, state, contact, email_id, image, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'School not found' });

    const imageUrl = image ? `${BASE_URL}/uploads/schoolImages/${image}` : null;
    res.status(200).json({ message: 'School updated successfully', imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error updating school', error: error.message });
  }
}


