import React, { useEffect } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Player from '../components/Player';
import { useDispatch } from 'react-redux';
import { getAuthToken } from '../../auth/redux/reducer';

function CoreLayout({ children, history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthToken());
  }, [dispatch]);

  return (
    <div className='main'>
      <SideBar />
      <div className='main__content'>
        <Header history={history} />
        <div className='main__content__child'>{children}</div>
      </div>
      <Player />
    </div>
  );
}

export default CoreLayout;
