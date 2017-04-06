import React from 'react'

export default function BackArrow (props) {
  const width = props.width || '100%'
  const height = props.height || '100%'
  const color = props.color || 'black'
  const className = props.className || ''

  return (
    <svg width={width} height={height} className={className} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
      <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <polyline fill='none' points='12.5,21 3.5,12 12.5,3 ' stroke={color} strokeMiterlimit='10' strokeWidth='2' />
        <line fill='none' stroke={color} strokeMiterlimit='10' strokeWidth='2' x1='22' x2='3.5' y1='12' y2='12' />
      </g>
    </svg>
  )
}
