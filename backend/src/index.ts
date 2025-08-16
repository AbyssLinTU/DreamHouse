import express from "express"
import helmet from "helmet"
import productRoute from "./routes/product.route"
import cors from "cors"
import commentRoute from "./routes/comments.route"
import authRoute from "./routes/auth.route"
import cookieParser from "cookie-parser"
import paypal from "paypal-rest-sdk"
import PaymentRoute from "./routes/payment.route"

paypal.configure({
   'mode': 'sandbox', // Замените на 'live' для реальных платежей
    'client_id': process.env.PAYPAL_CLIENT_ID as string,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET as string
})
const app = express()
const port = process.env.PORT || 4200 

app.use(express.json())
app.use(helmet())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));
app.use("/payment",PaymentRoute)
app.use("/products", productRoute)
app.use("/comments", commentRoute)
app.use("/auth", authRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})