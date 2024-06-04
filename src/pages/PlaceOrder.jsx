import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import selectedFoodAtom from '../atoms/selectedFoodAtom';
import axios from 'axios';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const item = useRecoilValue(selectedFoodAtom);
  console.log('selected food is: ', item);

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  if (!item) {
    navigate('/');
    return null;
  }
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('token');

  const handleOrder = async () => {
    if (!/^12\.\d{4}$/.test(latitude) || !/^77\.\d{4}$/.test(longitude)) {
      alert('Delivery not available at this location');
    } else {
      try {
        const res = await axios.post(
          `${BACKEND_BASE_URL}/api/v1/order/placeOrder`,
          {
            sourceLat: item.sourceLat,
            sourceLng: item.sourceLong,
            destLat: latitude,
            destLng: longitude,
            foodName: item.foodname,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data = res.data;
        console.log('response data:', data);
        if (res.status !== 201) {
          console.log(res.data.error);
          alert(`Error is: ${res.data.error}`);
        }
        navigate('/');
      } catch (error) {
        console.error('Error placing order:', error);
        alert('There was an error placing the order');
      }
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>Place Order</h1>
      <div className='bg-white shadow-md rounded-lg p-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>
          {item.foodname}
        </h2>
        <p className='text-gray-600 mb-4'>
          <span className='font-medium'>Restaurant:</span> {item.restaurant}
        </p>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='latitude'>
            Latitude
          </label>
          <input
            id='latitude'
            type='text'
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='longitude'>
            Longitude
          </label>
          <input
            id='longitude'
            type='text'
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4 bg-yellow-100 p-4 rounded-lg'>
          <p className='text-yellow-700'>
            <strong>Note:</strong> Delivery only available at Bengaluru
            (latitude: 12.xxxx, longitude: 77.xxxx)
          </p>
        </div>
        <button
          onClick={handleOrder}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300'
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
