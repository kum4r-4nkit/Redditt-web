import React from 'react'
import DotLoader from '../../assets/animations/loaders/dot-loader.gif'

const ContentDotLoader = () => {
  return (
    <img
      src={DotLoader}
      style={{ width: '200px', margin: '1rem auto', display: 'block' }}
      alt="Loading more"
    />
  )
}

export default ContentDotLoader