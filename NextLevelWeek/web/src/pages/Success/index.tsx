import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

import './styles.css';
interface Props {
  message?: string
};

const Success: React.FC<Props> = (props) => {
  return (
    <div id="register-completed">
      <FiCheckCircle color="#34CB79" size={70} />
      <span>
        <strong>
          {props.message}
        </strong>
      </span>
    </div>
  );
}

export default Success;