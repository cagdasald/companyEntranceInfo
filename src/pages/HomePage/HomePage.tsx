import React from 'react';
import AppButton from '../../components/Buttons/AppButton/AppButton';
import { setMe } from '../../core/services/app/setMe/setMe.slice';
import { useAppDispatch, useAppSelector } from '../../core/services/hooks';
import './HomePage.scss';

function HomePage() {
  const me = useAppSelector((state) => state.app.setMe.me);
  const dispatch = useAppDispatch();

  return (
    <div id="home-page" className="page">
      <div className="page-content">
        <h1>Welcome {me?.email}</h1>
        <AppButton onClick={() => dispatch(setMe())}>Logout</AppButton>
      </div>
    </div>
  );
}

export default HomePage;
