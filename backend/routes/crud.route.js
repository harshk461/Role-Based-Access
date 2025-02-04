const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "GET request received" });
});

router.post("/", (req, res) => {
  res.json({ message: "POST request received" });
});

router.put("/", (req, res) => {
  res.json({ message: "PUT request received" });
});

router.patch("/", (req, res) => {
  res.json({ message: "PATCH request received" });
});

router.delete("/", (req, res) => {
  res.json({ message: "DELETE request received" });
});

module.exports = router;
