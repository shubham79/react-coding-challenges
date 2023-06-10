import { Audio } from 'react-loader-spinner';

export default function Loader({ wrapperClassNm }) {
  return (
    <Audio
      height='60'
      width='60'
      radius='7'
      color='#564FD8'
      ariaLabel='loading-spinner'
      wrapperStyle
      wrapperClass={wrapperClassNm}
    />
  );
}
