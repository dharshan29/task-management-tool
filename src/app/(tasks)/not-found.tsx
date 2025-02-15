import { Stack } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import notFound from '@/assets/images/not_found.png'

const NotFound = () => {
  return (
    <Stack sx={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Image src={notFound} alt='not-found'/>
    </Stack>
  )
}

export default NotFound