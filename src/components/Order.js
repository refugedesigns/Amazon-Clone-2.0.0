import Currency from "react-currency-formatter";

const Order = ({ id, amount, shippingAmount, date, images, items }) => {
  const newDate = new Date(date);
  const formatedDate = newDate.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const numberOfItems = items.reduce((currNumber, item) => {
    return currNumber + item.quantity;
  }, 0);

  const quantity = items.map((item) => {
    return { quantity: item.quantity };
  });

  quantity.map((e, i) => (e.images = images[i]));


  return (
    <div className="relative border border-gray-300 rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-200 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{formatedDate}</p>
        </div>

        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} /> - Next Day Delivery{" "}
            <Currency quantity={shippingAmount} />
          </p>
        </div>

        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {numberOfItems} items
        </p>

        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {quantity.map((item, i) => (
            <div key={i} className="flex flex-col items-center justify-center space-y-2 space-x-4">
              <div className="border rounded-md space-y-2 w-48">
                <p className="text-center rounded-t-md bg-gray-200 text-gray-600 font-semibold">quantity {item.quantity}</p>
                <img
                  src={item.images}
                  alt=""
                  className="h-20 object-contain sm:h-32 mx-auto p-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
