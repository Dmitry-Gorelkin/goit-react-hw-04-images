import PropTypes from 'prop-types';
import { ButtonLoadMore, ButtonBox } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <ButtonBox>
      <ButtonLoadMore type="button" onClick={onClick}>
        Load More
      </ButtonLoadMore>
    </ButtonBox>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
