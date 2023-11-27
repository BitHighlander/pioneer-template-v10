import {
  CircularProgress,
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  Image,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  SimpleGrid,
  Card,
  CardBody,
} from '@chakra-ui/react';
// @ts-ignore
import pioneerImagePng from '~/lib/assets/png/pioneer.png';

import { useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';

import { usePioneer } from '~/lib/context/Pioneer';

const getWalletBadgeContent = (walletType: string) => {
  const icons: any = {
    metamask: '',
    keepkey: '',
    native: '',
  };

  const icon = icons[walletType];

  return (
    <AvatarBadge boxSize="1.25em" bg="green.500">
      <Image rounded="full" src={icon} />
    </AvatarBadge>
  );
};

const getWalletSettingsContent = (walletType: string) => {
  const icons: any = {
    metamask: '',
    keepkey: '',
    native: '',
  };

  const icon = icons[walletType];

  if (!icon) {
    return <div />;
  }

  return icon;
};

const Pioneer = () => {
  const { state, connectWallet } = usePioneer();
  const { api, app, status, balances } = state;
  const { onOpen } = useDisclosure();

  // local
  const [walletsAvailable, setWalletsAvailable] = useState([]);
  const [walletType, setWalletType] = useState('');
  const [pioneerImage, setPioneerImage] = useState('');
  // const [context, setContext] = useState('');
  const [isPioneer, setIsPioneer] = useState(false);

  const handleWalletClick = (wallet: {
    type: any;
    icon?: string | undefined;
    isConnected?: any;
  }) => {
    setPioneerImage('');
    setWalletType('KEEPKEY');
    setIsPioneer(true);
    console.log('Clicked wallet:', wallet.type);
    connectWallet(wallet.type);
    // Here you can use the 'connectMethodName' to handle specific click actions
    // For example: if (wallet.wallet.connectMethodName === 'connectKeepKey') { ... }
  };

  const renderWallets = () => {
    // setContext('test');
    console.log('rendering wallets!');
    console.log('rendering wallets!', app?.wallets);
    return walletsAvailable.map((wallet: any) => (
      <Card align="center" onClick={() => handleWalletClick(wallet)}>
        <CardBody>
          <Avatar src={wallet.icon}>
            {wallet.isConnected ? (
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            ) : (
              <AvatarBadge boxSize="1.25em" bg="red.500" />
            )}
          </Avatar>
        </CardBody>
        <small>{wallet.type}</small>
      </Card>
    ));
  };

  const onStart = async function () {
    try {
      console.log('onStart');
      console.log('wallets', app.wallets);
      if (app.wallets) {
        setWalletsAvailable(app.wallets);
      }
      if (app.isPioneer) {
        console.log('app.isPioneer: ', app.isPioneer);
        setIsPioneer(true);
        setPioneerImage(app.isPioneer);
      }
      const pioneerCache = localStorage.getItem('isPioneer');
      if (pioneerCache) {
        setIsPioneer(true);
        setPioneerImage(pioneerCache);
      }
      if (balances && balances.length > 0) {
        console.log('balances: ', balances);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    onStart();
  }, [app, app?.wallets, app?.isPioneer]);

  const settingsSelected = async function () {
    try {
      // console.log("settingsSelected");
      onOpen();
    } catch (e) {
      console.error(e);
    }
  };

  // const setContextWallet = async function (wallet: string) {
  //   try {
  //   } catch (e) {
  //     console.error('header e: ', e);
  //   }
  // };

  const setUser = async function () {
    try {
      console.log('wallets: ', app?.wallets);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-console
      console.error('header e: ', e);
      // setKeepKeyError("Bridge is offline!");
    }
  };

  useEffect(() => {
    setUser();
  }, [status, app, app?.wallets]);

  const avatarContent = api ? (
    getWalletBadgeContent(walletType)
  ) : (
    <AvatarBadge boxSize="1em" bg="red.500">
      <CircularProgress isIndeterminate size="1em" color="white" />
    </AvatarBadge>
  );

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="full"
        variant="link"
        cursor="pointer"
        minW={100}
      >
        <Avatar size="lg">
          {isPioneer ? (
            <Avatar size="lg" src={pioneerImage}>
              {avatarContent}
            </Avatar>
          ) : (
            <Avatar size="lg" src={pioneerImagePng}>
              {avatarContent}
            </Avatar>
          )}
        </Avatar>
      </MenuButton>
      <MenuList>
        <Box borderBottomWidth="1px" p="4">
          <HStack justifyContent="space-between">
            <Button
              leftIcon={
                <Avatar size="xs" src={getWalletSettingsContent(walletType)}>
                  <AvatarBadge boxSize="0.75em" bg="green.500" />
                </Avatar>
              }
            >
              <small>{/* <MiddleEllipsis text={context} /> */}</small>
            </Button>
            <IconButton
              icon={<FaCog />}
              isRound
              onClick={() => settingsSelected()}
              aria-label="Settings"
            />
            {/* <SettingsModal isOpen={isOpen} onClose={onClose} /> */}
          </HStack>
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="md"
          p="4"
          textAlign="left"
          maxWidth="300px"
          width="100%"
        >
          <div>
            <Flex alignItems="center">
              <small>status: {status}</small>
            </Flex>
            <Card
              p={2}
              borderRadius="md"
              boxShadow="sm"
              mb={2}
              className="caip"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                  <Avatar size="md" src={app?.assetContext?.image} mr={2} />
                  <Box fontSize="sm" fontWeight="bold">
                    Asset:
                  </Box>
                </Flex>
                <Box fontSize="sm" textAlign="right">
                  {app?.assetContext?.symbol}
                </Box>
              </Flex>
              <Flex justifyContent="space-between">
                <Box fontSize="xs" />
                <Box fontSize="xs" textAlign="right">
                  caip:
                  {/* <MiddleEllipsis text={app?.assetContext?.caip} /> */}
                </Box>
              </Flex>
            </Card>

            {/* Blockchain Card */}
            <Card
              p={2}
              borderRadius="md"
              boxShadow="sm"
              mb={2}
              className="caip"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                  <Avatar
                    size="md"
                    src={app?.blockchainContext?.image}
                    mr={2}
                  />
                  <Box fontSize="sm" fontWeight="bold">
                    Blockchain:
                  </Box>
                </Flex>
                <Box fontSize="sm" textAlign="right">
                  {app?.blockchainContext?.name}
                </Box>
              </Flex>
              <Flex justifyContent="space-between">
                <Box fontSize="xs" />
                <Box fontSize="xs" textAlign="right">
                  caip:
                  {/* <MiddleEllipsis text={app?.blockchainContext?.caip} /> */}
                </Box>
              </Flex>
            </Card>

            {/* Pubkey Card */}
            <Card p={2} borderRadius="md" boxShadow="sm" className="caip">
              <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                  {/* <Img */}
                  {/*    src={[app?.pubkeyContext?.walletImage]} */}
                  {/*    //@ts-ignore */}
                  {/*    loader={() => <Avatar size="md" src={app?.pubkeyContext?.walletImage} />} // Fixed: Make sure <Avatar /> returns an Element */}
                  {/*    //@ts-ignore */}
                  {/*    unloader={() => <Avatar size="md" src={app?.pubkeyContext?.walletImage} />} // Fixed: Make sure <Avatar /> returns an Element */}
                  {/*    container={(children) => ( */}
                  {/*        <div */}
                  {/*            style={{ */}
                  {/*              width: "32px", */}
                  {/*              height: "32px", */}
                  {/*              borderRadius: "50%", */}
                  {/*              overflow: "hidden", */}
                  {/*            }} */}
                  {/*        > */}
                  {/*          {children} */}
                  {/*        </div> */}
                  {/*    )} */}
                  {/* /> */}
                  <Box fontSize="sm" fontWeight="bold">
                    Pubkey Path:
                  </Box>
                </Flex>
                <Box fontSize="sm" textAlign="right">
                  {/* <MiddleEllipsis text={app?.pubkeyContext?.path} /> */}
                </Box>
              </Flex>
              <Flex justifyContent="space-between">
                <Box fontSize="xs">Pubkey:</Box>
                <Box fontSize="xs" textAlign="right">
                  {/* <MiddleEllipsis text={app?.pubkeyContext?.pubkey} /> */}
                </Box>
              </Flex>
            </Card>
          </div>
        </Box>

        <MenuItem>
          <SimpleGrid columns={3} row={1}>
            {renderWallets()}
          </SimpleGrid>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Pioneer;
