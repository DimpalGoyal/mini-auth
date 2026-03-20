const express = require("express");
const z = require("zod");
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
    return res.send("login successful");
  }
});

app.listen(8001, () => {
  console.log("server running");
});
