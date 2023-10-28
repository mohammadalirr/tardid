import { useMediaQuery } from '@mantine/hooks';

function useWindowSize() {
  const isMobile = useMediaQuery('(max-width: 47.9375em)');

  return { 
    isMobile
  }
}

export default useWindowSize
