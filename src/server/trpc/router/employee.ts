import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Role } from '../../../utils/utils'

import { router, protectedProcedure } from '../trpc'

export const employeeRouter = router({
  register: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email({ message: 'Formato de e-mail inválido.' }),
        roleName: z.string(),
        admissionData: z.date(),
        CPF: z.string(),
        pixKey: z.string().nullish(),
        bank: z.string().nullish(),
        agency: z.string().nullish(),
        account: z.string().nullish(),
        operation: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session.user.role || ctx.session.user.role.hierarchy < Role.Administrativo) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const role = await ctx.prisma.role.findUnique({ where: { name: input.roleName } })

      if (!role) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return ctx.prisma.user.create({
        data: { name: input.name, email: input.email, role: { connect: { id: role.id } } },
      })
    }),
})
