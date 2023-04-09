import parse from 'html-react-parser';
import React from 'react';
import FirebaseService from '../../core/services/firebase/firebaseService';
import './FirebaseKey.scss';

interface IProps {
  className?: string;
  firebaseKey: string;
}

function FirebaseKey(props: IProps) {
  return (
    <span
      key={props.firebaseKey}
      id="firebase-key"
      className={props.className ?? ''}
    >
      {parse(FirebaseService.getValue(props.firebaseKey))}
    </span>
  );
}

export default FirebaseKey;
