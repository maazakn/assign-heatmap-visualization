import { ChakraProvider } from '@chakra-ui/react';

const Theme = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ChakraProvider resetCSS cssVarsRoot='demo'>
      {children}
    </ChakraProvider>
  );
};

export default Theme;
