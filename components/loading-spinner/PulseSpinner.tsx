import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader'

interface Props {
  loading: any
}

export const PulseSpinner: React.FC<Props> = (props) => {
  // const { loading } = props
  return (
    <div className="center-spinner">
      <PulseLoader loading={props.loading} color={'#BDBAC2'} size={10} />
      <style jsx>{`
        margin: 0 auto;
      `}</style>
    </div>
  )
}
