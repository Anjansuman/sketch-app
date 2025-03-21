import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

import signupRoute from "./Routes/Signup";
import signinRoute from "./Routes/Signin";
import room from "./Routes/Room";
import chat from "./Routes/Chat";

app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/room', room);
app.use('/chat', chat);

app.listen(3001);