export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};

const login = async (req, res) => {
  try {
    const password = req.body;
    if (password === "123") return res.json({ msg: "User authenticated" });
    res.status(401).json({ msg: "Invalid password" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
