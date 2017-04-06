import React from 'react'

export default function NextButton (props) {
  const width = props.width || '100%'
  const height = props.height || '100%'
  const color = props.color || 'black'
  const className = props.className || ''
  const loading = props.loading || false

  if (!loading) {
    return (
      <svg width={width} height={height} className={className} viewBox='0 -1  41 42' xmlns='http://www.w3.org/2000/svg'>
        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <polygon fill={color} fillRule='nonzero' transform='translate(20.737909, 20.207960) rotate(90.000000) translate(-20.737909, -20.207960) ' points='14.5299498 13.3700502 15.9299498 11.9700502 26.9458691 22.4458691 20.9458691 28.4458691 19.5458691 27.0458691 24.1458691 22.4458691' />
        </g>
      </svg>
    )
  }
  return (
    <svg stroke={color} width={width} height={height} className={className} viewBox='0 0  38 38' xmlns='http://www.w3.org/2000/svg'>
      <g fill='none' fillRule='evenodd'>
        <g transform='translate(1 1)' strokeWidth='2'>
          <circle strokeOpacity='.5' cx='18' cy='18' r='18' />
          <path d='M36 18c0-9.94-8.06-18-18-18'>
            <animateTransform
              attributeName='transform'
              type='rotate'
              from='0 18 18'
              to='360 18 18'
              dur='1s'
              repeatCount='indefinite' />
          </path>
        </g>
      </g>
    </svg>
  )
}
