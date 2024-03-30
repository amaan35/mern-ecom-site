import React, { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  console.log(orderDetail);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/order/get", {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data);
        } else {
          setOrders(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);
  useEffect(() => {
    const order = orders.find((order) => order._id === selectedOrder);
    setOrderDetail(order);
  }, [selectedOrder]);
  return (
    <div className="flex p-3 gap-5">
      <div className="space-y-4 border-r-2 h-[80vh] pr-3">
        <p className="text-2xl font-semibold">Order ID : </p>
        <div className="space-y-1">
          {orders.map((order) => {
            return (
              <div
                className={`text-lg bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-md px-2 py-3 ${
                  selectedOrder === order._id && "bg-gray-300 hover:bg-gray-300"
                }`}
                key={order._id}
                onClick={() => setSelectedOrder(order._id)}
              >
                {order._id}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-grow">
        <p className="text-2xl font-semibold">Order details : </p>
        {orderDetail && (
          <div className="space-y-3">
            <p>Address : {orderDetail.address}</p>
            {orderDetail.items.map((product) => {
              return (
                <div className="border-2 rounded-lg p-3 w-[80%] shadow-md">
                  <div className="flex gap-4">
                    <img src={product.item.images[0]} width={200} />
                    <div className="gap-2">
                      <p>{product.item.title}</p>
                      <p>Brand : {product.item.brand}</p>
                      <p>Category : {product.item.category}</p>
                      <p>Price : {product.item.price}</p>
                      <p>Quantity : {product.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
