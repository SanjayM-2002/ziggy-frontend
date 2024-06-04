import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import PrimaryButton from './PrimaryButton';

const Appbar = () => {
  const navigate = useNavigate();

  const currentUser = useRecoilValue(userAtom);
  const setCurrentUser = useSetRecoilState(userAtom);

  const fullname = currentUser?.name;
  const handleSignout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/login');
  };
  return (
    <>
      <div className='shadow h-14 flex justify-between items-center md:px-10'>
        <Link to={'/'}>
          <div className='flex flex-col justify-center h-full ml-4 font-bold'>
            Ziggy
          </div>
        </Link>
        <div className='flex items-center justify-center gap-2'>
          {currentUser && !currentUser.error && (
            <>
              <PrimaryButton label={'Sign Out'} onClick={handleSignout} />
              <div className='flex flex-col justify-center h-full mr-4'>
                {fullname}
              </div>
              <div className='rounded-full h-10 w-10 p-4 bg-blue-500 flex justify-center mr-2'>
                <div className='flex flex-col justify-center h-full text-xl text-yellow-200'>
                  {fullname[0].toUpperCase()}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Appbar;
