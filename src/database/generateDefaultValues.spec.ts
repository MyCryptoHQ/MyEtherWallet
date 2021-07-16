import { AssetLegacy, LocalStorage, LSKeys } from '@types';
import { toArray } from '@utils';

import { NETWORKS_CONFIG, SCHEMA_BASE } from './data';
import { createDefaultValues } from './generateDefaultValues';

const DAI = {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  ticker: 'DAI',
  decimal: 18,
  name: 'Dai Stablecoin v2.0',
  uuid: 'e1f698bf-cb85-5405-b563-14774af14bf1'
} as AssetLegacy;

describe('Schema', () => {
  let defaultData: LocalStorage;

  beforeAll(() => {
    // add one token to networks, to test adding tokens from localstorage
    const customNetworkConfig = { ...NETWORKS_CONFIG };
    customNetworkConfig.Ethereum.tokens.push(DAI);

    defaultData = createDefaultValues(SCHEMA_BASE, customNetworkConfig);
  });

  it('defaultData has with valid properties', () => {
    const ref = Object.keys(SCHEMA_BASE);
    const real = Object.keys(defaultData);
    expect(ref).toEqual(real);
  });

  it('excludes testAccounts by default', () => {
    const accounts = toArray(defaultData[LSKeys.ACCOUNTS]);
    expect(accounts).toHaveLength(0);
  });

  describe('Seed: Contracts', () => {
    it('add Contracts to Store', () => {
      const contracts = toArray(defaultData[LSKeys.CONTRACTS]);
      expect(contracts.length).toBeGreaterThanOrEqual(40);
    });
  });

  describe('Seed: Networks', () => {
    it('adds Contracts to Networks', () => {
      const contracts = toArray(defaultData[LSKeys.NETWORKS]).flatMap((n) => n.contracts);
      expect(contracts.length).toBeGreaterThanOrEqual(42);
    });

    it('adds Nodes to each Network', () => {
      const nodes = toArray(defaultData[LSKeys.NETWORKS]).flatMap((n) => n.nodes);
      expect(nodes).toHaveLength(57);
    });
  });

  describe('Seed: Assets', () => {
    it("adds each Network's baseAsset to Assets", () => {
      const networks = toArray(defaultData[LSKeys.NETWORKS]);
      const baseAssets = toArray(defaultData[LSKeys.ASSETS]).filter(({ type }) => type === 'base');
      expect(baseAssets).toHaveLength(networks.length);
    });

    it('adds default Fiats as Assets', () => {
      const fiats = toArray(defaultData[LSKeys.ASSETS]).filter(({ type }) => type === 'fiat');
      expect(fiats.length).toBeGreaterThanOrEqual(3);
    });

    it('adds Tokens to Assets', () => {
      const tokens = toArray(defaultData[LSKeys.ASSETS]).filter(({ type }) => type === 'erc20');
      expect(tokens.length).toBeGreaterThan(0);
    });
  });
});
