import { Fragment } from 'react';

import { Box, Icon, LinkApp } from '@components';
import { translateRaw } from '@translations';
import { BusyBottomConfig } from '@types';

import { configs } from './constants';

export const BusyBottom = ({ type }: { type: BusyBottomConfig }) => {
  return (
    <Box mt={4}>
      <Box style={{ textAlign: 'center' }} mb={2}>
        {translateRaw('BUSY_BOTTOM_HEADER')}
      </Box>
      <Box variant="rowAlign" justifyContent="center">
        {configs[type].map(({ copy, copyVariables, link, external }, index) => {
          return (
            <Fragment key={index}>
              <LinkApp isExternal={!!external} href={link} textAlign="center">
                {translateRaw(copy, copyVariables)}
              </LinkApp>

              {index < configs[type].length - 1 && (
                <Box paddingX="15px" paddingY={1} variant="rowAlign">
                  <Icon type="separator" />
                </Box>
              )}
            </Fragment>
          );
        })}
      </Box>
    </Box>
  );
};
