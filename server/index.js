const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors({ origin: "*" }));

const { userRouter } = require("./routes/userRoute");
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
