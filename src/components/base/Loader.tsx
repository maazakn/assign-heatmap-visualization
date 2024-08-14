'use client';
import { Flex, Stack, Text, Spinner } from '@chakra-ui/react';

interface PageLoaderProps {
  text?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ text = 'Loading...' }) => {
  return (
    <Flex
      justify={'center'}
      align={'center'}
      w={'100%'}
      h={'100%'}
      pos={'fixed'}
      top={0}
      left={0}
      bg={'gray.50'}
      opacity={70}>
      <Stack align={'center'}>
        <Spinner size='md' color='teal' />
        <Text>{text}</Text>
      </Stack>
    </Flex>
  );
};

export default PageLoader;
