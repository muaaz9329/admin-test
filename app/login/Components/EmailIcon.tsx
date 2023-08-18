import React from 'react'

export type IconProps = {
    Width: number,
    Height: number
}

const EmailIcon = ({Height,Width}: IconProps) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={Width}
    height={Height}
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M16.6667 4.16663H3.33333C3.10322 4.16663 2.89488 4.2599 2.74408 4.4107C2.59328 4.56151 2.5 4.76984 2.5 4.99996V15C2.5 15.4602 2.8731 15.8333 3.33333 15.8333H16.6667C17.1269 15.8333 17.5 15.4602 17.5 15V4.99996C17.5 4.76984 17.4067 4.56151 17.2559 4.4107C17.1051 4.2599 16.8967 4.16663 16.6667 4.16663Z"
      stroke="#818181"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.74414 4.41064L8.82157 10.488C9.4724 11.1389 10.5277 11.1389 11.1786 10.488L17.256 4.41064"
      stroke="#818181"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  )
}
export default EmailIcon