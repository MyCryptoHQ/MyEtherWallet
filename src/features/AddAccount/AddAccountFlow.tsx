import { useEffect, useReducer, useState } from 'react';

import { withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { ExtendedContentPanel, WalletList } from '@components';
import { IWalletConfig, ROUTE_PATHS, WALLETS_CONFIG } from '@config';
import { useDispatch } from '@store';
import { addNewAccounts } from '@store/account.slice';
import { IStory, WalletId } from '@types';
import { useUpdateEffect } from '@vendor';

import { formReducer, initialState } from './AddAccountForm.reducer';
import { getStories } from './stories';
import { FormDataActionType as ActionType } from './types';

export const getStory = (storyName: WalletId): IStory => {
  return getStories().filter((selected) => selected.name === storyName)[0];
};

export const getStorySteps = (storyName: WalletId) => {
  return getStory(storyName.toUpperCase() as WalletId).steps;
};

export const getWalletInfo = (storyName: WalletId): IWalletConfig => {
  return WALLETS_CONFIG[storyName.toUpperCase() as WalletId];
};

export const isValidWalletId = (id: WalletId | string | undefined) => {
  return !!(id && Object.values(WalletId).includes(id as WalletId));
};

/*
  Flow to add an account to database. The default view of the component
  displays a list of wallets (e.g. stories) that each posses their own number
  of steps.
    - AddAccountFlow handles the stepper
    - AddAccountFormProvider handles the form state and is accessed by each story.
*/
const AddAccountFlow = withRouter(({ history, match }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0); // The current Step inside the Wallet Story.
  const [formData, updateFormState] = useReducer(formReducer, initialState); // The data that we want to save at the end.

  const storyName: WalletId = formData.accountType; // The Wallet Story that we are tracking.
  const isDefaultView = storyName === undefined;
  const addr = formData.accountData.length > 0 ? formData.accountData[0] : '';
  // Try to add an account after unlocking the wallet
  // If we have completed the form, and add account fails we return to dashboard
  useEffect(() => {
    const { network, accountData, accountType } = formData;
    if (addr && accountData) {
      dispatch(addNewAccounts({ networkId: network, accountType, newAccounts: accountData }));
      history.push(ROUTE_PATHS.DASHBOARD.path);
    }
  }, [addr]);

  // If there is a valid walletName parameter in the URL, update state and let router effect redirect to that wallet
  useEffect(() => {
    const { walletId } = match.params; // Read the walletName parameter from the URL
    if (!walletId) {
      return;
    } else if (!isValidWalletId(walletId.toUpperCase())) {
      goToStart();
    } else if (walletId.toUpperCase() !== storyName) {
      updateFormState({
        type: ActionType.SELECT_ACCOUNT_TYPE,
        payload: { accountType: walletId.toUpperCase() }
      });
    }
  }, [match.params]);

  // Update the url when we select a specific story. Since the storyName is always undefined on first mount,
  // we run the effect only on update.
  useUpdateEffect(() => {
    isValidWalletId(storyName)
      ? history.replace(`${ROUTE_PATHS.ADD_ACCOUNT.path}/${storyName.toLowerCase()}`)
      : history.replace(`${ROUTE_PATHS.ADD_ACCOUNT.path}`);
  }, [formData.accountType]);

  const goToStart = () => {
    setStep(0);
    updateFormState({ type: ActionType.RESET_FORM, payload: '' });
  };

  const goToNextStep = () => {
    const nextStep = Math.min(step + 1, getStorySteps(storyName).length - 1);
    setStep(nextStep);
  };

  const goToPreviousStep = () => {
    if (step === 0) return goToStart();
    setStep(step - 1);
  };

  const onWalletSelection = (name: WalletId) => {
    updateFormState({ type: ActionType.SELECT_ACCOUNT_TYPE, payload: { accountType: name } });
  };

  const renderDefault = () => {
    return (
      <ExtendedContentPanel width="810px">
        <TransitionGroup>
          <CSSTransition classNames="DecryptContent" timeout={500}>
            <WalletList wallets={getStories()} onSelect={onWalletSelection} showHeader={true} />
          </CSSTransition>
        </TransitionGroup>
      </ExtendedContentPanel>
    );
  };

  const renderStep = () => {
    const steps = getStorySteps(storyName);
    const Step = steps[step];

    return (
      <ExtendedContentPanel
        onBack={goToPreviousStep}
        stepper={steps.length > 1 ? { current: step + 1, total: steps.length } : undefined}
        width="810px"
      >
        <TransitionGroup>
          <CSSTransition classNames="DecryptContent" timeout={500}>
            <Step
              wallet={getWalletInfo(storyName)}
              goToStart={goToStart}
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
              onUnlock={(payload: any) => updateFormState({ type: ActionType.ON_UNLOCK, payload })}
              formData={formData}
              formDispatch={updateFormState}
            />
          </CSSTransition>
        </TransitionGroup>
      </ExtendedContentPanel>
    );
  };

  return <>{isDefaultView ? renderDefault() : renderStep()}</>;
});

export default AddAccountFlow;
