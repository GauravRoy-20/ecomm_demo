import { Image } from 'react-bootstrap';
import { errorPlaceholder } from '../Constants/constant';

export const ErrorPage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Image
        src={errorPlaceholder}
        alt={'error'}
        style={{
          width: '90%',
          height: '90%',
        }}
      />
    </div>
  );
};
