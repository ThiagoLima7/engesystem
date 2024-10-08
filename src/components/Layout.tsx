import type { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Box } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Box h="100vh">
      <Header />
      <Sidebar />
      <Box h="90%" as="main" bgColor="whitesmoke">
        {children}
      </Box>
    </Box>
  )
}
