const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const pool = mysql.createPool({
  connectionLimit: 10, 
  host: "localhost",
  user: "root",
  password: "1234",
  database: "alumniportal",
});

function queryDatabase(query, values = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        return reject(err);
      }
      connection.query(query, values, (error, results) => {
        connection.release(); 
        if (error) return reject(error);
        resolve(results);
      });
    });
  });
}

// Routes

app.post("/submit-form", async (req, res) => {
  const { userName, jobStatus, mobile, social, batch, email, password } = req.body;
  const query = "INSERT INTO user (userName, jobStatus, mobile, social, batch, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
  try {
    await queryDatabase(query, [userName, jobStatus, mobile, social, batch, email, password]);
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Error saving data" });
  }
});

app.post("/add-event", async (req, res) => {
  const { location, organiser, description, date } = req.body;
  const query = "INSERT INTO events (location, organiser, description, date) VALUES (?, ?, ?, ?)";

  try {
    await queryDatabase(query, [location, organiser, description, date]);
    res.json({ success: true, message: "Event data saved successfully" });
  } catch (error) {
    console.error("Error saving event data:", error);
    res.status(500).json({ success: false, message: "Error saving event data", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { batch, email, password } = req.body;
  const query = "SELECT * FROM user WHERE batch = ? AND email = ? AND password = ?";

  try {
    const results = await queryDatabase(query, [batch, email, password]);
    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.json({ success: false, message: "Invalid batch, email, or password" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Error fetching user data" });
  }
});
app.post("/message", async (req, res) => {
  const { user, message } = req.body;
  const query = "INSERT INTO messages (user, message) VALUES (?, ?)";
  
  try {
    await queryDatabase(query, [user, message]);
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Error saving data" });
  }
});

app.post("/meetup", async (req, res) => {
  const { name, city, s_date, e_date } = req.body;
  const query = "INSERT INTO meetup (name, city, s_date, e_date) VALUES (?, ?, ?, ?)";
  
  try {
    await queryDatabase(query, [name, city, s_date, e_date]);
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, meetup: "Error saving data" });
  }
});

app.post("/events", async (req, res) => {
  const {counter, location}= req.body
  const query = "UPDATE events SET counter = ? where location = ?";
  // const query = "UPDATE events SET counter = 5";

  try {
    await queryDatabase(query,[counter,location]); 
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Error saving data" });
  }
});



app.get("/events", async (req, res) => {
  const query = "SELECT * FROM events";

  try {
    const results = await queryDatabase(query);
    res.json({ success: true, events: results });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Error fetching events" });
  }
});


app.get("/network", async (req, res) => {
  const query = "SELECT * FROM user";

  try {
    const results = await queryDatabase(query);
    res.json({ success: true, events: results });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
});

app.get("/messages", async (req, res) => {
  const query = "SELECT * FROM messages";

  try {
    const results = await queryDatabase(query);
    res.json({ success: true, messages: results });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Error fetching messages" });
  }
});

app.get("/meetup", async (req, res) => {
  const query = "SELECT * FROM meetup";

  try {
    const results = await queryDatabase(query);
    res.json({ success: true, meetups: results });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Error fetching events" });
  }
});

app.get("/mapdemo", async (req, res) => {
  const query = "SELECT city FROM meetup";

  try {
    const results = await queryDatabase(query);
    res.json({ success: true, meetups: results });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Error fetching events" });
  }
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000 Db");
});
