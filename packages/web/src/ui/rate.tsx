import React from 'react'
import { Rate } from 'antd'
import { RateProps } from 'antd/lib/rate'

const RateWithTooltips: React.FC<RateProps> = (props) => (
  <Rate
    tooltips={['péssimo', 'ruim', 'normal', 'bom', 'excelente']}
    {...props}
  />
)

export default RateWithTooltips
