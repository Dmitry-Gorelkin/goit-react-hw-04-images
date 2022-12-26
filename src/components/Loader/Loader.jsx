import { ThreeDots } from 'react-loader-spinner';
import { LoaderBox } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderBox>
      <ThreeDots
        height="100"
        width="100"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </LoaderBox>
  );
};
