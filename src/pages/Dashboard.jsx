import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import items from '../constants/items';
import Order from '../components/Order';
import FoodItem from '../components/FoodItem';
import selectedFoodAtom from '../atoms/selectedFoodAtom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import assignedOrdersAtom from '../atoms/assignedOrdersAtom';
import deliveredOrdersAtom from '../atoms/deliveredOrdersAtom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [activeTab, setActiveTab] = useState('assigned');
  const currentUser = useRecoilValue(userAtom);
  const setSelectedFood = useSetRecoilState(selectedFoodAtom);
  const setAssignedOrders = useSetRecoilState(assignedOrdersAtom);
  const setDeliveredOrders = useSetRecoilState(deliveredOrdersAtom);
  const assignedOrderList = useRecoilValue(assignedOrdersAtom);
  console.log('assigned list is: ', assignedOrderList);
  const deliveredOrderList = useRecoilValue(deliveredOrdersAtom);
  console.log('delivered list is: ', deliveredOrderList);
  //   console.log('current user at dashboard page is: ', currentUser);
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('token');
  const fetchAssignedOrders = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_BASE_URL}/api/v1/order/assignedOrders`,

        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = res.data;
      console.log('response data for fetch assigned is:', data);
      if (res.status !== 200) {
        console.log(res.data.error);
        alert(`Error is: ${res.data.error}`);
      } else {
        setAssignedOrders(data);
      }
    } catch (error) {
      console.error('Error fetching assigned orders:', error);
      alert('Error fetching assigned orders: ', error);
    }
  };
  const fetchDeliveredOrders = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_BASE_URL}/api/v1/order/deliveredOrders`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = res.data;
      console.log('response data for fetch delivered is:', data);
      if (res.status !== 200) {
        console.log(res.data.error);
        alert(`Error is: ${res.data.error}`);
      } else {
        setDeliveredOrders(data);
      }
    } catch (error) {
      console.error('Error fetching delivered orders:', error);
      alert('Error fetching delivered orders: ', error);
    }
  };
  const checkOrderStatus = async (order) => {
    const now = new Date();
    const isoString = now.toISOString();
    try {
      const res = await axios.put(
        `${BACKEND_BASE_URL}/api/v1/order/checkOrder/${order.id}`,
        {
          currentTime: isoString,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = res.data;
      console.log('response is: ', res.data);
      alert(res.data.message);
    } catch (error) {
      console.error('Error checking order status:', error);
      alert('Error checking order status: ', error);
    }
  };
  useEffect(() => {
    setFoodItems(items);
    fetchAssignedOrders();
    fetchDeliveredOrders();
  }, []);

  const handleOrder = (i) => {
    setSelectedFood(i);
    navigate('/placeOrder');
  };
  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>
          Food Delivery Dashboard
        </h1>

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
          <div className='lg:col-span-2'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>
              Popular Items
            </h2>
            <div className='space-y-4'>
              {foodItems.map((item) => (
                <FoodItem
                  key={item.id}
                  item={item}
                  onClick={() => handleOrder(item)}
                />
              ))}
            </div>
          </div>

          <div className='lg:col-span-3'>
            <div className='bg-gray-100 rounded-lg shadow-lg p-6'>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                Orders Dashboard
              </h2>
              <div className='flex space-x-4 mb-6'>
                <button
                  onClick={() => setActiveTab('assigned')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none ${
                    activeTab === 'assigned'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Assigned Orders
                </button>
                <button
                  onClick={() => setActiveTab('delivered')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none ${
                    activeTab === 'delivered'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Delivered Orders
                </button>
              </div>
              <div className='space-y-4'>
                {/* Display assigned or delivered orders based on the activeTab */}
                {activeTab === 'assigned' &&
                  assignedOrderList.map((order) => (
                    <Order
                      key={order.id}
                      order={order}
                      onClick={() => checkOrderStatus(order)}
                    />
                  ))}
                {activeTab === 'delivered' &&
                  deliveredOrderList.map((order) => (
                    <Order key={order.id} order={order} onClick={() => {}} />
                  ))}
                {assignedOrderList.length === 0 &&
                  deliveredOrderList.length === 0 && (
                    <div className='bg-gray-200 rounded-lg p-8 text-center'>
                      <p className='text-4xl mb-4'>🕊️</p>
                      <p className='text-gray-600'>No orders at the moment.</p>
                      <p className='text-sm text-gray-500 mt-2'>
                        Take a quick break!
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
