import React from 'react';

import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@components';
import Box from '@components/Box';
import { Body } from '@components/NewTypography';
import { useUserActions } from '@services';
import { SPACING } from '@theme';
import { ACTION_STATE, ActionTemplate } from '@types';

const SBox = styled(Box)`
  & > * {
    margin-bottom: ${SPACING.BASE};
  }
`;

export const ActionDetails = ({ actionTemplate }: { actionTemplate: ActionTemplate }) => {
  const { updateUserAction, userActions } = useUserActions();
  const history = useHistory();

  const userAction = userActions.find((el) => el.name === actionTemplate.name)!;

  const Component = actionTemplate.Component;
  const handleClick = () => {
    userAction.state != 'default' &&
      updateUserAction(userAction.uuid, { ...userAction, state: ACTION_STATE.STARTED });
    actionTemplate.button.external
      ? window.open(actionTemplate.button.to, '_blank', 'nopperer noreferer')
      : history.push(actionTemplate.button.to);
  };
  return (
    <Box
      px={SPACING.BASE}
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <SBox>
        {actionTemplate.body && actionTemplate.body.map((item, i) => <Body key={i}>{item}</Body>)}
        {Component && <Component {...actionTemplate.props} />}
      </SBox>
      <Box mb={SPACING.BASE}>
        <Button
          onClick={handleClick}
          disabled={userAction.state != 'default' && userAction.state === 'completed'}
          fullwidth={true}
        >
          {actionTemplate.button.content}
        </Button>
      </Box>
    </Box>
  );
};