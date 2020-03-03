import React from 'react';
import styled from 'styled-components';

import { COLORS, SPACING } from 'v2/theme';
import { Button } from 'v2/components';

import { IZapConfig } from '../config';
import { ProtocolTagsList } from '..';
import { translateRaw } from 'v2/translations';

const DetailsListHeader = styled.h4`
  color: ${COLORS.PURPLE};
`;

const DetailsBulletPoints = styled.ol`
  padding-bottom: ${SPACING.XS};
  padding-inline-start: ${SPACING.MD};
  font-weight: bold;
`;

const DetailsPlatformsUsed = styled.div`
  padding-bottom: ${SPACING.MD};
`;

interface Props {
  zapSelected: IZapConfig;
  onSubmit(): void;
}

const DetailsList = (props: Props) => {
  const { zapSelected, onSubmit } = props;
  const { platformsUsed, bulletPoints, positionDetails } = zapSelected;

  return (
    <>
      <DetailsListHeader>{positionDetails}</DetailsListHeader>
      <DetailsBulletPoints>
        {bulletPoints.map(bulletPoint => (
          <li key={bulletPoint}>{bulletPoint}</li>
        ))}
      </DetailsBulletPoints>
      <DetailsPlatformsUsed>
        {translateRaw('PLATFORMS_USED')}
        <ProtocolTagsList platformsUsed={platformsUsed} />
      </DetailsPlatformsUsed>
      <Button onClick={onSubmit}>Start Earning Now!</Button>
    </>
  );
};

export default DetailsList;
