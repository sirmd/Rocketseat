import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './styles.css';
interface Props {
  message?: string,
  page?: string
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
      <Link to={!props.page ? '/' : props.page}>
        <button>
          Ok!
          </button>
      </Link>
    </div>
  );
}

export default Success;