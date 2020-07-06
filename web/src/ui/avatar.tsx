import React from 'react'
import { Avatar } from 'antd'

import { TUser, TGender } from '../types'

type TSize = 'sm' | 'md' | 'lg'
const sizes: { [K in TSize]: [number, number] } = {
  sm: [42, 46],
  md: [52, 54],
  lg: [62, 65],
}

type TData = {
  [U in TUser]: {
    [G in TGender]: {
      ch: string
      desc: string
    }
  }
}
const data: TData = {
  doctor: {
    M: { ch: '👨‍⚕', desc: 'man health worker' },
    F: { ch: '👩‍⚕️', desc: 'woman health worker' },
  },
  patient: {
    M: { ch: '👨‍💼', desc: 'man worker' },
    F: { ch: '👩‍💼', desc: 'woman worker' },
  },
}

const AvatarWithEmoji: React.FC<{
  user: TUser
  gender: TGender
  size: TSize
}> = (props) => {
  const { ch, desc } = data[props.user][props.gender]
  const [avatarSize, fontSize] = sizes[props.size]

  return (
    <Avatar
      style={{ backgroundColor: '#eaeaea', border: '1px solid #ddd' }}
      size={avatarSize}
    >
      <span role='img' aria-label={desc}>
        <p
          style={{
            fontSize: `${fontSize}px`,
            userSelect: 'none',
            margin: '0 0 0.7em 0',
          }}
        >
          {ch}
        </p>
      </span>
    </Avatar>
  )
}

export default AvatarWithEmoji
