import React from 'react';

const Order = ({ order, onClick }) => (
  <div className='bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300'>
    <div className='flex justify-between items-center mb-3'>
      <h3 className='text-lg font-semibold text-gray-800'>Order #{order.id}</h3>
      <span className='text-black px-3 py-1 rounded-full text-sm font-medium capitalize'>
        {order.status}
      </span>
    </div>
    <p className='text-gray-700 mb-2'>
      <span className='font-medium'>Food:</span> {order.foodName}
    </p>
    {order.partnerName && (
      <p className='text-gray-600 text-sm mb-3'>
        <span className='font-medium'>Delivery Person:</span>{' '}
        {order.partnerName}
      </p>
    )}
    <div className='flex justify-between items-center'>
      {order.status === 'assigned' && (
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm transition-colors duration-300'
          onClick={onClick}
        >
          Check Status
        </button>
      )}
      <p className='text-gray-500 text-sm italic'>
        Expected Delivery time: {order.expectedDeliveryTime}
      </p>
    </div>
  </div>
);

export default Order;
