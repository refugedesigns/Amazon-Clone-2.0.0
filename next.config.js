module.exports = {
  images: {
    domains: ["fakestoreapi.com", "links.papareact.com"],
  },
  env: {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    HOST: process.env.HOST,
    STRIPE_SIGNING_SECRET: process.env.STRIPE_SIGNING_SECRET,
    BASE_URL: "https://amazon-clone-200.herokuapp.com/",
  },
};