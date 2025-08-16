import { Router } from "express";
import PaymentController from "../controllers/payment.controller";

const PaymentRoute = Router();

PaymentRoute.post('/create-payment', PaymentController.createPayment)
PaymentRoute.post('/execute-payment', PaymentController.executePayment)
export default PaymentRoute