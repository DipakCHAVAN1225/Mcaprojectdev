import express from 'express';
const app = express();

// app.uae('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

app.get("/greet/:name",(req,res)=>{
    res.send("<h1>hello "+req.params.name+"</h1>")
})

app.get("/",(req,res)=>{
    res.status(404).send("hello hi")
})

export default app;