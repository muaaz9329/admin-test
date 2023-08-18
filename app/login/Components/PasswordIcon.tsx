import React from 'react'
import { IconProps } from './EmailIcon'



const PasswordIcon = ({Height,Width}: IconProps) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={Height}
    height={Width}
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M6.6665 9.16667V5.83333C6.6665 4.72223 7.33317 2.5 9.99984 2.5C11.5918 2.5 12.4709 3.29193 12.921 4.16667"
      stroke="#818181"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.8332 17.5H4.1665V9.16663H6.6665H13.3332H15.8332V17.5Z"
      stroke="#818181"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  )
}

export default PasswordIcon