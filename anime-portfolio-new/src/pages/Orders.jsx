import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../api/index.js';

/**
 * Orders page.  Fetches and displays a list of past orders.  Each
 * order shows its ID (or index), date, number of items and total
 * amount.  In a real application you would filter by the current
 * user and show more detailed information.
 */
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  if (loading) return <p className="mt-8 text-center">Loading orders...</p>;
  if (error) return <p className="mt-8 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li key={order.id || index} className="border rounded p-4 bg-card text-foreground">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order #{order.id || index + 1}</p>
                  <p className="text-sm text-secondary">{new Date(order.date).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p>{order.items?.length || 0} item(s)</p>
                  <p className="font-bold">₹{order.total?.toFixed(2)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
