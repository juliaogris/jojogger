import React from 'react'

export default function Pencil (props) {
  const width = props.width || '14px'
  const height = props.height || '14px'
  const color = props.color || 'black'
  const className = props.className || ''

  return (
    <svg width={width} height={height} className={className} viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
      <g stroke={color} fill='none' fillRule='evenodd'>
        <path d='m70.064 422.35 374.27-374.26 107.58 107.58-374.26 374.27-129.56 21.97z' strokeWidth='30' />
        <path d='m70.569 417.81 110.61 110.61' strokeWidth='25' />
        <path d='m491.47 108.37-366.69 366.68' strokeWidth='25' />
        <path d='m54.222 507.26 40.975 39.546' strokeWidth='25' />
      </g>
    </svg>
  )
}
