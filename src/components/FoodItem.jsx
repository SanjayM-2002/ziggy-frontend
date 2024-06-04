import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import selectedFoodAtom from '../atoms/selectedFoodAtom';

const FoodItem = ({ item, onClick }) => {
  const navigate = useNavigate();
  const setSelectedFood = useSetRecoilState(selectedFoodAtom);

  const handleOrderNow = () => {
    setSelectedFood(item);
    navigate('/placeOrder');
  };

  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden mb-4 hover:shadow-lg transition-shadow duration-300'>
      <div className='relative'>
        {item.imageLink ? (
          <img
            src={item.imageLink}
            alt={item.foodname}
            className='w-full h-48 object-cover'
          />
        ) : (
          <div className='w-full h-48 bg-gray-200 flex items-center justify-center'>
            <span className='text-gray-500 text-lg font-semibold'>
              No Image
            </span>
          </div>
        )}
        <div className='absolute top-0 right-0 bg-green-500 text-white px-2 py-1 m-2 rounded-full text-sm font-semibold'>
          ₹{item.price}
        </div>
      </div>
      <div className='p-4'>
        <h3 className='text-xl font-semibold text-gray-800 mb-2'>
          {item.foodname}
        </h3>
        <p className='text-gray-600 text-sm mb-2'>
          <span className='font-medium'>Restaurant:</span> {item.restaurant}
        </p>
        <div className='flex items-center text-sm text-gray-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4 mr-1'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          <span>
            {item.sourceLat}, {item.sourceLong}
          </span>
        </div>
      </div>
      <div className='px-4 py-3 bg-gray-50 flex justify-between items-center'>
        <button
          onClick={onClick}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-colors duration-300'
        >
          Order Now
        </button>
        {/* <button className='text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors duration-300'>
          View Details
        </button> */}
      </div>
    </div>
  );
};

export default FoodItem;
