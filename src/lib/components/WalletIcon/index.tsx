// Import React as these functions return JSX elements
import { Avatar, AvatarBadge, Image } from '@chakra-ui/react';

// @ts-ignore
import pioneerImagePng from '~/lib/assets/png/pioneer.png';
// @ts-ignore
import KeepKeyImagePng from '~/lib/assets/png/keepkey.png';
// @ts-ignore
import MetaMaskImagePng from '~/lib/assets/png/metamask.png';
// @ts-ignore
import KeplerImagePng from '~/lib/assets/png/keplr.png';
// @ts-ignore
import XDEFIImagePng from '~/lib/assets/png/XDEFI.png';
// @ts-ignore
import LedgerImagePng from '~/lib/assets/png/ledger.png';
// @ts-ignore
import wcImagePng from '~/lib/assets/svg/wc.svg';

const icons: any = {
  metamask: MetaMaskImagePng,
  keepkey: KeepKeyImagePng,
  native: pioneerImagePng,
  keplr: KeplerImagePng,
  xdefi: XDEFIImagePng,
  ledger: LedgerImagePng,
  wc: wcImagePng,
};

export const getWalletContent = (walletType: string) => {
  const icon = icons[walletType.toLowerCase()];
  return <Avatar src={icon} />;
};

export const getWalletBadgeContent = (walletType: string, size?: string) => {
  const icon = icons[walletType.toLowerCase()];
  // eslint-disable-next-line no-param-reassign
  if (!size) size = '1.25em';
  return (
    <AvatarBadge boxSize={size}>
      <Image rounded="full" src={icon} />
    </AvatarBadge>
  );
};

export {
  pioneerImagePng,
  KeepKeyImagePng,
  MetaMaskImagePng,
  KeplerImagePng,
  XDEFIImagePng,
  LedgerImagePng,
  wcImagePng,
};
