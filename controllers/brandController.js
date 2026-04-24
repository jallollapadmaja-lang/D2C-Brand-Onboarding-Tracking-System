const db = require('../models/brandModel');

// ✅ Create Brand
exports.createBrand = (req, res) => {
  const { brand_name, founder_name, category, monthly_revenue, website } = req.body;

  if (!brand_name || !founder_name || !category) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const revenue = monthly_revenue || 0;

  if (revenue < 0) {
    return res.status(400).json({ error: "Revenue must be >= 0" });
  }

  const query = `
    INSERT INTO brands (brand_name, founder_name, category, monthly_revenue, website)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [brand_name, founder_name, category, revenue, website], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ message: "Brand created successfully" });
  });
};

// ✅ Get All Brands (with filters)
exports.getBrands = (req, res) => {
  let query = "SELECT * FROM brands WHERE 1=1";
  let values = [];

  if (req.query.status) {
    query += " AND status = ?";
    values.push(req.query.status);
  }

  if (req.query.category) {
    query += " AND category = ?";
    values.push(req.query.category);
  }

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);
  });
};

// ✅ Get Single Brand with Notes
exports.getBrandById = (req, res) => {
  const id = req.params.id;

  const brandQuery = "SELECT * FROM brands WHERE id = ?";

  db.query(brandQuery, [id], (err, brandResult) => {
    if (err) return res.status(500).json({ error: err.message });

    if (brandResult.length === 0) {
      return res.status(404).json({ error: "Brand not found" });
    }

    const notesQuery = "SELECT * FROM notes WHERE brand_id = ?";

    db.query(notesQuery, [id], (err, notesResult) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        ...brandResult[0],
        notes: notesResult
      });
    });
  });
};

// ✅ Update Status (with validation)
exports.updateStatus = (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  const flow = {
    SUBMITTED: ["UNDER_REVIEW"],
    UNDER_REVIEW: ["SHORTLISTED"],
    SHORTLISTED: ["ACCEPTED", "REJECTED"],
    ACCEPTED: [],
    REJECTED: []
  };

  db.query("SELECT status FROM brands WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(404).json({ error: "Brand not found" });
    }

    const currentStatus = result[0].status;

    if (!flow[currentStatus].includes(status)) {
      return res.status(400).json({ error: "Invalid status transition" });
    }

    db.query("UPDATE brands SET status = ? WHERE id = ?", [status, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: "Status updated successfully" });
    });
  });
};

// ✅ Add Note
exports.addNote = (req, res) => {
  const id = req.params.id;
  const { note } = req.body;

  if (!note || note.trim() === "") {
    return res.status(400).json({ error: "Note cannot be empty" });
  }

  const query = "INSERT INTO notes (brand_id, note) VALUES (?, ?)";

  db.query(query, [id, note], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ message: "Note added successfully" });
  });
};

// ✅ Dashboard Summary
exports.getSummary = (req, res) => {
  const query = `
    SELECT
      COUNT(*) AS total,
      SUM(status='SUBMITTED') AS submitted,
      SUM(status='UNDER_REVIEW') AS under_review,
      SUM(status='SHORTLISTED') AS shortlisted,
      SUM(status='ACCEPTED') AS accepted,
      SUM(status='REJECTED') AS rejected
    FROM brands
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(result[0]);
  });
};