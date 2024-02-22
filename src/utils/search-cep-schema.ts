import { z } from 'zod'

export const searchCepSchema = z.object({
  postalCode: z.string().refine((value) => /^\d{8}$/.test(value), {
    message: 'CEP inválido. Deve conter 8 dígitos numéricos.',
  }),
})

export type FormSearchInputs = z.infer<typeof searchCepSchema>
