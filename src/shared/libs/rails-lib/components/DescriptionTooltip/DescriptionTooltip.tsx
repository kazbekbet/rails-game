import { FC } from 'react';
import { Tooltip, ITooltip } from 'react-tooltip';
import * as Styled from './styled';

interface IDescriptionTooltip extends ITooltip {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

const DescriptionTooltip: FC<IDescriptionTooltip> = ({ className, title, description, ...tooltipProps }) => (
  <Tooltip {...tooltipProps} className={className}>
    <Styled.DescriptionTooltipContainer>
      {title && <p>{title}</p>}
      {description && <Styled.DescriptionText>{description}</Styled.DescriptionText>}
    </Styled.DescriptionTooltipContainer>
  </Tooltip>
);

export default DescriptionTooltip;
