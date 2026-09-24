const express = require("express");
const app = express();
const PORT = 8008;
const path = require("path");

app.use(express.json());
const workingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  const isWorkingDay = day >= 1 && day <= 5;
  const isWorkingHour = hour >= 9 && hour <= 17;
  if (isWorkingDay && isWorkingHour) {
    next();
  } else {
    res.send(
      "<h1> this site close now his working between(09:00 - 17:00)</h1>",
    );
  }
};
app.use(workingHours);
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.js"));
});
app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "services.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.use((err, req, res, next) => {
  res.status(500).send("error");
});
app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});
