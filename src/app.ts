import express from 'express'
import userRouter from './routes/user-router'



const app = express()

app.use(express.json())


app.post('/user', userRouter)

export default app