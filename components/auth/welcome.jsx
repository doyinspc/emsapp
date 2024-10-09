import React from 'react'
import CustomProfileCard from '../CustomProfileCard'
import Loading from '../Loading'



const Welcome = (props) => {
    const {data} = props

  return (
    <React.Suspense fallback={<Loading />}>
      {data && <CustomProfileCard data={data} />}
    </React.Suspense>
  )
}

export default Welcome