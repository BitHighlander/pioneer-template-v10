import { Box, Flex } from '@chakra-ui/react';

import ThemeToggle from './ThemeToggle';
import Pioneer from '~/lib/components/Pioneer';

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <Box marginLeft="auto">
        <ThemeToggle />
        <Pioneer />
      </Box>
    </Flex>
  );
};

export default Header;
