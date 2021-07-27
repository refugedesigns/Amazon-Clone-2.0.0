import { getSession } from "next-auth/client"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const handler = async(req, res) => {
    const session = await getSession({ req: req })
    
    if (!session) {
        return res.status(422).json({message: "Not Authenticated!"})
    }

    const { items, totalQuantity, totalAmount, email } = req.body

    const transformedItems = items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        price_data: {
            currency: 'usd',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image],
            }
        }
    }))

    const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ['shr_1JH3L4EGeVpld5Y1Y4E5N2CX'],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA']
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        }
    })

    res.status(200).json({id: stripeSession.id})
}

export default handler