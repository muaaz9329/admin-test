import React from 'react'

type Props = {}

export default function layout  ({children}: {
    children: React.ReactNode
})  {
  return (
    <div
    className='flex flex-col items-center justify-center min-h-screen py-2'
    >{children}</div>
  )
}