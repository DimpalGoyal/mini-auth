const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/auth", (req, res) => {
  // defining schema
  const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(10),
  });

  // parsing the schema
  const result = authSchema.safeParse(req.body);

  // invalid input
  if (!result.success) {
    return res.status(400).send("invalid input");
  }

  const { email, password } = result.data;

  // simple check
  if (email === "dimpu123@gmail.com" && password === "dimpu123") {
    const token = jwt.sign({ email }, "1234");
    return res.send(token);
  }
});

app.post("/verify", (req, res) => {
  const { userToken } = req.body;
  if (!userToken) {
    return res.send("no token provided");
  }

  try {
    const decoded = jwt.verify(userToken, "1234");
    return res.send(decoded);
  } catch {
    return res.send("invlaid token");
  }
});

app.listen(8001, () => {
  console.log("server running");
});
