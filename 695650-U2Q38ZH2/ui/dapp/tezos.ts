import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType } from '@airgap/beacon-sdk';

const Tezos = new TezosToolkit('https://testnet-tezos.giganode.io');

const options = {
  name: 'MyAwesomeDapp',
  iconUrl: 'https://tezostaquito.io/img/favicon.svg',
  preferredNetwork: NetworkType.MAINNET,
  eventHandlers: {
    PERMISSION_REQUEST_SUCCESS: {
      handler: async (data: any) => {
        console.log('permission data:', data);
      },
    },
  },
};

const wallet = new BeaconWallet(options);

Tezos.setWalletProvider(wallet);

export async function connectWallet() {
  await wallet.requestPermissions({ network: { type: NetworkType.MAINNET } });
  const userAddress = await wallet.getPKH();
  console.log(`Connected with ${userAddress}`);

  return {
    Tezos,
    wallet,
    userAddress,
    disconnect: () => wallet.clearActiveAccount(),
  };
}