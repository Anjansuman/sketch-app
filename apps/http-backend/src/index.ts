import express from "express";

const app = express();

app.use(express.json());

import signupRoute from "./Routes/Signup";
import signinRoute from "./Routes/Signin";
import createRoom from "./Routes/Create-Room";

app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/create-room', createRoom);

app.listen(3001);