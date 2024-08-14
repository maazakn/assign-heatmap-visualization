import React from 'react'
import Theme from './Theme';

const AllProviders = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <Theme>{children}</Theme>
  )
}

export default AllProviders