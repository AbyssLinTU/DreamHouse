import { Request, Response } from "express";
import paypal from 'paypal-rest-sdk';
const PaymentController = {
    createPayment: async (req: Request, res: Response) => {
        const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `${process.env.CLIENT_URL}/success`, // URL для успешного платежа
            "cancel_url": `${process.env.CLIENT_URL}/cancel` // URL для отмены
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Ваш товар",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Описание платежа."
        }]
    };
    paypal.payment.create(create_payment_json, function (error: any, payment: any) {
        if (error) {
            console.error(JSON.stringify(error.response));
            res.status(500).send(error);
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.json({ approvalUrl: payment.links[i].href });
                }
            }
        }
    });
    },
    executePayment: async (req:Request, res:Response) => {
        const { paymentId, PayerID } = req.body;

    const execute_payment_json = {
        "payer_id": PayerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.error(JSON.stringify(error.response));
            res.status(500).send(error);
        } else {
            res.status(200).json(payment);
        }
    });
    }
}
export default PaymentController