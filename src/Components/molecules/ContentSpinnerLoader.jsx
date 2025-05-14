import React from 'react'
import RoundSpinner from '../../assets/animations/loaders/loading-spinner.gif'

const ContentSpinnerLoader = () => {
  return (
    <img
      src={RoundSpinner}
      style={{ width: '150px', margin: 'auto', display: 'block' }}
      alt="Loading"
    />
  )
}

export default ContentSpinnerLoader