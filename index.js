import express from 'express';
import connection from './db.js';
import User1 from './schema.js';
import User from './userschema.js';
import cors from "cors";
import bcrypt from 'bcrypt';
const app = express();
const port = 3500;
connection()
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
    console.log("Hello world")
    res.send("hello");
});

app.post('/post',async (req,res)=>{
    try{
        const{name,address,mobile_no,message,}=req.body;
        const newUser=new User1({name,mobile_no,address,age})
        await newUser.save()
        console.log("data saved sucessfully");
        res.status(201).json({ message: 'User saved successfully', user: newUser });
    }
    catch(error)
    {
        console.log("error saving data",error)
    }
})

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});

app.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
          return res.status(400).json({ msg: 'User does not exist!' });
        }
    
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          console.log('Login successful');
    
          res.status(200).json({
            username: user.username,
            user_id: user._id,
            msg: 'Login successful',
          });
        } else {
          res.status(400).json({ msg: 'Password does not match' });
        }

      } catch (error) {
        return res.status(500).json({ msg: 'Error while getting users' });
      }
})

app.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;

    const user = await User.create({
      username: username,
      password: hashedPassword,
    });

    console.log(user);
    return res.status(200).json({ msg: 'Signup successful' });
  } catch (error) {
    return res.status(500).json({ msg: 'Error while signing up user' });
  }
})


