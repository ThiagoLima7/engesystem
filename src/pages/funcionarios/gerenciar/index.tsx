import { Container, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import EmployeeTable from '../../../components/EmployeeTable'
import { trpc } from '../../../utils/trpc'

const Gerenciar: NextPage = () => {
  const { data: rowData, status } = trpc.employee.getAll.useQuery()

  if (status === 'loading') return <div>Carregando table...</div>

  return (
    <Container maxW="container.lg">
      <Box w="100%">
        <EmployeeTable rowData={rowData} />
      </Box>
    </Container>
  )
}

export default Gerenciar
