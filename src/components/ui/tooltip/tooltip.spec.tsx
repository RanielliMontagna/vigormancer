import { render, waitFor } from '@testing-library/react-native'

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

describe('Tooltip', () => {
  it('should render the component', async () => {
    const { findByTestId } = render(
      <Tooltip>
        <TooltipTrigger testID="tooltip-trigger">Tooltip</TooltipTrigger>
        <TooltipContent sideOffset={4}>Tooltip</TooltipContent>
      </Tooltip>,
    )

    expect(await findByTestId('tooltip-trigger')).toBeTruthy()
  })

  it('should render the component with portalHost', async () => {
    const { findByTestId } = render(
      <Tooltip>
        <TooltipTrigger testID="tooltip-trigger">Tooltip</TooltipTrigger>
        <TooltipContent portalHost="root">Tooltip</TooltipContent>
      </Tooltip>,
    )

    expect(await findByTestId('tooltip-trigger')).toBeTruthy()
  })
})
