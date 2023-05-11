import userValidation from "../validation/user_validation";

router.post("/user/registr", (req, res) => {
  console.log(req.body);
  res.status(201).send("Zor");
  const { error } = userValidation(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({ msg: error.details[0].message });
  }
});

router.post("/user/login", (req, res) => {
  console.log(req.body);
  res.status(201).send("Zor");
  const { error } = userValidation(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({ msg: error.details[0].message });
  }
});

router.post("/user/post", (req, res) => {
  console.log(req.body);
  res.status(201).send("Zor");
  const { error } = userValidation(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({ msg: error.details[0].message });
  }
});
