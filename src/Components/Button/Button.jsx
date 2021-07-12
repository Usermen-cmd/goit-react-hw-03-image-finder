import PropTypes from 'prop-types';
//Styles
import { ButtonMore } from './Button.styles';

const Button = ({ onClick }) => {
  return (
    <ButtonMore type="button" onClick={onClick}>
      Load More
    </ButtonMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
