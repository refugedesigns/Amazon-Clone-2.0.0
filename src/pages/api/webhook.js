import { buffer } from "micro"
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY)
const endpointSecrete = process.env.STRIPE_SIGNING_SECRET

const { connectDb } = require("../../lib/db")
const mongoose = require("mongoose")
const Order = require("../../models/orders")
const User = require("../../models/user")

export default async (req, res) => {
    
    if (req.method === "POST") {
        const requestBuffer = await buffer(req)
        const payload = requestBuffer.toString()
        const sig = req.headers["stripe-signature"]

        let event

        // Verify that the event posted came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecrete)
        } catch (err) {
            console.log("Error!", err.message)
            return res.status(400).json({ message: `webhook error! ${err.message}` })
        }

        // Handle the checkout.session.completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object

            try {
                await connectDb()
            } catch (err) {
                return res.status(500).json({message: "Failed to connect to database!"})
            }

            const order = new Order({
                name: session.shipping.name,
                stripeOrderId: session.id,
                email: session.metadata.email,
                stripeCustomerId: session.customer,
                images: JSON.parse(session.metadata.images),
                amount: session.amount_subtotal / 100,
                shippingAmount: session.total_details.amount_shipping / 100,
                shipping: {
                    address: {
                        city: session.shipping.address.city,
                        country: session.shipping.address.country,
                        line1: session.shipping.address.line1,
                        line2: session.shipping.address.line2,
                        postalCode: session.shipping.address.postal_code,
                        state: session.shipping.address.state
                    }
                }

            })

            const savedOrder = await order.save()
            
            const user = await User.findOne({ email: savedOrder.email })
            
            if (!user) {
                await mongoose.disconnect()
                return res.status(404).json({message: "No user with this email found!"})
            }

            user.orders.push(savedOrder)

            await user.save()
            
            await mongoose.disconnect()
            return res.status(201).json({message: "Order created sucessfully!", orderId: savedOrder._id.toString()})
            
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}