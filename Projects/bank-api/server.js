const app = require("./app2")

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Fake bank API running on http://localhost:${port}`);
});
