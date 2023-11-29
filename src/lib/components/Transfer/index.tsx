/*
    Transfer
      This component is used to send crypto to another address.
 */
import {
  Button,
  Grid,
  Heading,
  Text,
  Input,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  Spinner,
  Avatar,
} from '@chakra-ui/react';

// @ts-ignore
import { COIN_MAP_LONG } from '@pioneer-platform/pioneer-coins';

// eslint-disable-next-line import/no-extraneous-dependencies
// import { Chain } from '@pioneer-platform/types';
import { useEffect, useState, useCallback } from 'react';

import { usePioneer } from '~/lib/context/Pioneer';

const Transfer = ({ openModal }: any) => {
  const toast = useToast();
  const { state, connectWallet } = usePioneer();
  const { app, assetContext, balances, context } = state;
  const [isPairing, setIsPairing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [modalType, setModalType] = useState("");
  const [inputAmount, setInputAmount] = useState('');
  const [sendAmount, setSendAmount] = useState<any | undefined>();
  const [recipient, setRecipient] = useState('');

  // start the context provider
  useEffect(() => {
    setIsPairing(false);
  }, [app, app?.context]);

  const handleInputChange = (value: string) => {
    setInputAmount(value);
    if (!assetContext) return;
    // const float = parseFloat(value);
    // const amount = new Amount(
    //   float,
    //   AmountType.ASSET_AMOUNT,
    //   assetContext.asset.decimal
    // );
    setSendAmount('');
  };

  const handleSend = useCallback(async () => {
    try {
      if (!inputAmount) alert('You MUST input an amount to send!');
      if (!recipient) alert('You MUST input a recipient to send to!');

      setIsSubmitting(true);
      // @TODO Validate Address!
      // verify is connected
      const isContextExist = app.wallets.some(
        (wallet: any) => wallet.context === context
      );
      if (!isContextExist) {
        setIsPairing(true);
        const contextType = context.split(':')[0];
        console.log('contextType: ', contextType);
        // connect it
        connectWallet(contextType.toUpperCase());
      } else {
        /*
            assetValue: AssetValue;
            recipient: string;
            memo?: string;
            feeOptionKey?: FeeOption;
            feeRate?: number;
            data?: string;
            from?: string;
            expiration?: number;
         */
        const txHash = await app.swapKit.transfer({
          assetContext,
          memo: '',
          recipient,
        });
        window.open(
          `${app.swapKit.getExplorerTxUrl(
            assetContext.chain,
            txHash as string
          )}`,
          '_blank'
        );
      }
    } catch (e: any) {
      console.error(e);
      toast({
        title: 'Error',
        description: e.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [assetContext, inputAmount, app, recipient, sendAmount, toast]);

  return (
    <VStack spacing={5} align="start" p={6} borderRadius="md">
      <Heading as="h1" size="lg">
        Send Crypto!
      </Heading>
      {isPairing ? (
        <Text>
          Connecting to {context}...
          <Spinner size="xl" />
          Please check your wallet to approve the connection.
        </Text>
      ) : (
        <div>
          <Avatar
            size="xl"
            src={`https://pioneers.dev/coins/${
              COIN_MAP_LONG[assetContext?.chain]
            }.png`}
          />
          <Text>Asset: {assetContext?.name || 'N/A'}</Text>
          <Text>Chain: {assetContext?.chain || 'N/A'}</Text>
          <Text>Symbol: {assetContext?.symbol || 'N/A'}</Text>
          <Button
            onClick={() => openModal('Select Asset')}
            isDisabled={!balances}
          >
            Change Asset
          </Button>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <FormControl>
              <FormLabel>Recipient:</FormLabel>
              <Input
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Address"
                value={recipient}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Input Amount:</FormLabel>
              <Input
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="0.0"
                value={inputAmount}
              />
            </FormControl>
          </Grid>
          <Text>
            Available Balance: {assetContext?.balance} ({assetContext?.symbol})
          </Text>
          <Button mt={4} isLoading={isSubmitting} onClick={handleSend} w="full">
            {isSubmitting ? <Spinner size="xs" /> : 'Send'}
          </Button>
        </div>
      )}
    </VStack>
  );
};

export default Transfer;
