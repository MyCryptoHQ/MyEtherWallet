import { lazy } from 'react';

import { Redirect } from 'react-router-dom';

import { ROUTE_PATHS } from '@config';
import { FeatureFlags } from '@services/FeatureFlag';
import { IAppRoute } from '@types';
import { isTruthy } from '@utils';

const Dashboard = lazy(() =>
  import(/* webpackChunkName: "Dashboard" */ '@features/Dashboard/Dashboard')
);
const AddAccountFlow = lazy(() =>
  import(/* webpackChunkName: "AddAccountFlow" */ '@features/AddAccount/AddAccountFlow')
);
const SendAssets = lazy(() =>
  import(/* webpackChunkName: "SendAssets" */ '@features/SendAssets/SendAssets')
);
const Settings = lazy(() =>
  import(/* webpackChunkName: "Settings" */ '@features/Settings/Settings')
);
const Import = lazy(() =>
  import(/* webpackChunkName: "Import" */ '@features/Settings/Import/Import')
);
const Export = lazy(() =>
  import(/* webpackChunkName: "Export" */ '@features/Settings/Export/Export')
);
const DownloadApp = lazy(() =>
  import(/* webpackChunkName: "DownloadApp" */ '@features/DownloadApp/DownloadApp')
);
const RequestAssets = lazy(() =>
  import(/* webpackChunkName: "RequestAssets" */ '@features/RequestAssets/RequestAssets')
);
const SwapAssetsFlow = lazy(() =>
  import(/* webpackChunkName: "SwapAssetsFlow" */ '@features/SwapAssets/SwapAssetsFlow')
);
const SignAndVerifyMessage = lazy(() =>
  import(
    /* webpackChunkName: "SignAndVerifyMessage" */ '@features/SignAndVerifyMessage/SignAndVerifyMessage'
  )
);
const BroadcastTransactionFlow = lazy(() =>
  import(
    /* webpackChunkName: "BroadcastTransactionFlow" */ '@features/BroadcastTransaction/BroadcastTransactionFlow'
  )
);
const InteractWithContractsFlow = lazy(() =>
  import(
    /* webpackChunkName: "InteractWithContractsFlow" */ '@features/InteractWithContracts/InteractWithContractsFlow'
  )
);
const DeployContractsFlow = lazy(() =>
  import(
    /* webpackChunkName: "DeployContractsFlow" */ '@features/DeployContracts/DeployContractsFlow'
  )
);
const DeFiZapFlow = lazy(() =>
  import(/* webpackChunkName: "DeFiZapFlow" */ '@features/DeFiZap/DeFiZapFlow')
);
const PurchaseMembershipStepper = lazy(() =>
  import(
    /* webpackChunkName: "PurchaseMembershipStepper" */ '@features/PurchaseMembership/PurchaseMembershipStepper'
  )
);
const MembershipEducation = lazy(() =>
  import(
    /* webpackChunkName: "MembershipEducation" */ '@features/PurchaseMembership/components/MembershipEducation'
  )
);
const BuyAssets = lazy(() =>
  import(/* webpackChunkName: "BuyAssetsForm" */ '@features/BuyAssets/BuyAssetsForm')
);
const EnsDashboard = lazy(() =>
  import(/* webpackChunkName: "EnsDashboard" */ '@features/Ens/EnsDashboard')
);
const TxStatus = lazy(() =>
  import(/* webpackChunkName: "TxStatus" */ '@features/TxStatus/TxStatus')
);

const RepTokenMigration = lazy(() =>
  import(/* webpackChunkName: "TokenMigration" */ '@features/RepTokenMigration')
);

const AaveTokenMigration = lazy(() =>
  import(/* webpackChunkName: "TokenMigration" */ '@features/AaveTokenMigration')
);

const AntTokenMigration = lazy(() =>
  import(/* webpackChunkName: "TokenMigration" */ '@features/AntTokenMigration')
);
const Faucet = lazy(() => import(/* webpackChunkName: "Faucet" */ '@features/Faucet'));

const GolemTokenMigration = lazy(() =>
  import(/* webpackChunkName: "TokenMigration" */ '@features/GolemTokenMigration')
);

export interface IAppRoutes {
  [K: string]: IAppRoute;
}

const DownloadAppRedirect = () => <Redirect to={ROUTE_PATHS.DOWNLOAD_DESKTOP_APP.path} />;

export const getStaticAppRoutes = (featureFlags: FeatureFlags): IAppRoute[] => [
  {
    name: ROUTE_PATHS.DASHBOARD.name,
    title: ROUTE_PATHS.DASHBOARD.title,
    path: ROUTE_PATHS.DASHBOARD.path,
    enabled: isTruthy(featureFlags.DASHBOARD),
    exact: true,
    requireAccounts: true,
    component: Dashboard
  },
  {
    name: ROUTE_PATHS.ADD_ACCOUNT.name,
    title: ROUTE_PATHS.ADD_ACCOUNT.title,
    path: `${ROUTE_PATHS.ADD_ACCOUNT.path}/:walletId?`,
    enabled: isTruthy(featureFlags.ADD_ACCOUNT),
    exact: true,
    component: AddAccountFlow
  },
  {
    name: ROUTE_PATHS.CREATE_WALLET.name,
    title: ROUTE_PATHS.CREATE_WALLET.title,
    path: ROUTE_PATHS.CREATE_WALLET.path,
    enabled: isTruthy(featureFlags.CREATE_WALLET),
    exact: true,
    component: DownloadAppRedirect
  },
  {
    name: ROUTE_PATHS.DOWNLOAD_DESKTOP_APP.name,
    title: ROUTE_PATHS.DOWNLOAD_DESKTOP_APP.title,
    path: ROUTE_PATHS.DOWNLOAD_DESKTOP_APP.path,
    enabled: isTruthy(featureFlags.DOWNLOAD_DESKTOP_APP),
    exact: true,
    component: DownloadApp
  },
  {
    name: ROUTE_PATHS.REQUEST_ASSETS.name,
    title: ROUTE_PATHS.REQUEST_ASSETS.title,
    path: ROUTE_PATHS.REQUEST_ASSETS.path,
    enabled: isTruthy(featureFlags.REQUEST_ASSETS),
    exact: true,
    requireAccounts: true,
    component: RequestAssets
  },
  {
    name: ROUTE_PATHS.SEND.name,
    title: ROUTE_PATHS.SEND.title,
    path: ROUTE_PATHS.SEND.path,
    enabled: isTruthy(featureFlags.SEND_ASSETS),
    exact: true,
    requireAccounts: true,
    component: SendAssets
  },
  {
    name: ROUTE_PATHS.SETTINGS.name,
    title: ROUTE_PATHS.SETTINGS.title,
    path: ROUTE_PATHS.SETTINGS.path,
    enabled: isTruthy(featureFlags.SETTINGS),
    exact: true,
    component: Settings
  },
  {
    name: ROUTE_PATHS.SETTINGS_IMPORT.name,
    title: ROUTE_PATHS.SETTINGS_IMPORT.title,
    path: ROUTE_PATHS.SETTINGS_IMPORT.path,
    enabled: isTruthy(featureFlags.SETTINGS),
    exact: true,
    component: Import
  },
  {
    name: ROUTE_PATHS.SETTINGS_EXPORT.name,
    title: ROUTE_PATHS.SETTINGS_EXPORT.title,
    path: ROUTE_PATHS.SETTINGS_EXPORT.path,
    enabled: isTruthy(featureFlags.SETTINGS),
    exact: true,
    component: Export
  },
  {
    name: ROUTE_PATHS.SWAP.name,
    title: ROUTE_PATHS.SWAP.title,
    path: ROUTE_PATHS.SWAP.path,
    enabled: isTruthy(featureFlags.SWAP),
    requireAccounts: true,
    exact: true,
    component: SwapAssetsFlow
  },
  {
    name: ROUTE_PATHS.SIGN_MESSAGE.name,
    title: ROUTE_PATHS.SIGN_MESSAGE.title,
    path: ROUTE_PATHS.SIGN_MESSAGE.path,
    enabled: isTruthy(featureFlags.SIGN_MESSAGE),
    exact: true,
    component: SignAndVerifyMessage
  },
  {
    name: ROUTE_PATHS.VERIFY_MESSAGE.name,
    title: ROUTE_PATHS.VERIFY_MESSAGE.title,
    path: ROUTE_PATHS.VERIFY_MESSAGE.path,
    enabled: isTruthy(featureFlags.VERIFY_MESSAGE),
    exact: true,
    component: SignAndVerifyMessage
  },
  {
    name: ROUTE_PATHS.BROADCAST_TX.name,
    title: ROUTE_PATHS.BROADCAST_TX.title,
    path: ROUTE_PATHS.BROADCAST_TX.path,
    enabled: isTruthy(featureFlags.BROADCAST_TX),
    component: BroadcastTransactionFlow
  },
  {
    name: ROUTE_PATHS.INTERACT_WITH_CONTRACTS.name,
    title: ROUTE_PATHS.INTERACT_WITH_CONTRACTS.title,
    path: ROUTE_PATHS.INTERACT_WITH_CONTRACTS.path,
    enabled: isTruthy(featureFlags.CONTRACT_INTERACT),
    component: InteractWithContractsFlow
  },
  {
    name: ROUTE_PATHS.DEPLOY_CONTRACTS.name,
    title: ROUTE_PATHS.DEPLOY_CONTRACTS.title,
    path: ROUTE_PATHS.DEPLOY_CONTRACTS.path,
    enabled: isTruthy(featureFlags.CONTRACT_DEPLOY),
    component: DeployContractsFlow
  },
  {
    name: ROUTE_PATHS.DEFIZAP.name,
    title: ROUTE_PATHS.DEFIZAP.title,
    path: `${ROUTE_PATHS.DEFIZAP.path}/:zapName?`,
    exact: true,
    requireAccounts: true,
    enabled: isTruthy(featureFlags.DEFIZAP),
    component: DeFiZapFlow
  },
  {
    name: ROUTE_PATHS.MYC_MEMBERSHIP.name,
    title: ROUTE_PATHS.MYC_MEMBERSHIP.title,
    path: ROUTE_PATHS.MYC_MEMBERSHIP.path,
    exact: true,
    requireAccounts: false,
    enabled: isTruthy(featureFlags.MYC_MEMBERSHIP),
    component: MembershipEducation
  },
  {
    name: ROUTE_PATHS.MYC_MEMBERSHIP_BUY.name,
    title: ROUTE_PATHS.MYC_MEMBERSHIP_BUY.title,
    path: `${ROUTE_PATHS.MYC_MEMBERSHIP_BUY.path}`,
    exact: true,
    requireAccounts: false,
    enabled: isTruthy(featureFlags.MYC_MEMBERSHIP),
    component: PurchaseMembershipStepper
  },
  {
    name: ROUTE_PATHS.BUY.name,
    title: ROUTE_PATHS.BUY.title,
    path: ROUTE_PATHS.BUY.path,
    exact: true,
    requireAccounts: false,
    enabled: isTruthy(featureFlags.BUY),
    component: BuyAssets
  },
  {
    name: ROUTE_PATHS.ENS.name,
    title: ROUTE_PATHS.ENS.title,
    path: ROUTE_PATHS.ENS.path,
    exact: true,
    requireAccounts: true,
    enabled: isTruthy(featureFlags.ENS),
    component: EnsDashboard
  },
  {
    name: ROUTE_PATHS.TX_STATUS.name,
    title: ROUTE_PATHS.TX_STATUS.title,
    path: ROUTE_PATHS.TX_STATUS.path,
    exact: true,
    enabled: isTruthy(featureFlags.TX_STATUS),
    component: TxStatus
  },
  {
    name: ROUTE_PATHS.REP_TOKEN_MIGRATION.name,
    title: ROUTE_PATHS.REP_TOKEN_MIGRATION.title,
    path: ROUTE_PATHS.REP_TOKEN_MIGRATION.path,
    exact: true,
    requireAccounts: true,
    enabled: isTruthy(featureFlags.REP_TOKEN_MIGRATION),
    component: RepTokenMigration
  },
  {
    name: ROUTE_PATHS.AAVE_TOKEN_MIGRATION.name,
    title: ROUTE_PATHS.AAVE_TOKEN_MIGRATION.title,
    path: ROUTE_PATHS.AAVE_TOKEN_MIGRATION.path,
    exact: true,
    requireAccounts: true,
    enabled: isTruthy(featureFlags.AAVE_TOKEN_MIGRATION),
    component: AaveTokenMigration
  },
  {
    name: ROUTE_PATHS.ANT_TOKEN_MIGRATION.name,
    title: ROUTE_PATHS.ANT_TOKEN_MIGRATION.title,
    path: ROUTE_PATHS.ANT_TOKEN_MIGRATION.path,
    exact: true,
    requireAccounts: true,
    enabled: isTruthy(featureFlags.ANT_TOKEN_MIGRATION),
    component: AntTokenMigration
  },
  {
    name: ROUTE_PATHS.GOLEM_TOKEN_MIGRATION.name,
    title: ROUTE_PATHS.GOLEM_TOKEN_MIGRATION.title,
    path: ROUTE_PATHS.GOLEM_TOKEN_MIGRATION.path,
    exact: true,
    requireAccounts: true,
    enabled: isTruthy(featureFlags.GOLEM_TOKEN_MIGRATION),
    component: GolemTokenMigration
  },
  {
    name: ROUTE_PATHS.FAUCET.name,
    title: ROUTE_PATHS.FAUCET.title,
    path: ROUTE_PATHS.FAUCET.path,
    exact: true,
    requireAccounts: true,
    enabled: isTruthy(featureFlags.FAUCET),
    component: Faucet
  }
];

// Enabled Routes
export const getAppRoutes = (featureFlags: FeatureFlags) =>
  getStaticAppRoutes(featureFlags).filter((APP_ROUTE) => APP_ROUTE.enabled);

export const createAppRoutesObject = (paths: IAppRoute[]) => {
  return paths.reduce((navLinks, path) => {
    navLinks[path.name] = path;
    return navLinks;
  }, {} as IAppRoutes);
};

// APP_ROUTE_OBJECT is for ALL routes, even disabled ones.
export const getAppRoutesObject = (featureFlags: FeatureFlags) =>
  createAppRoutesObject(getStaticAppRoutes(featureFlags));
