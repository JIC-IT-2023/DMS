import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import test from '../../public/jic_logo.png'
export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <>
      <Image src={test}  width={170} height={40}/>
    </>
  );
};
