import { useMutation } from '@tanstack/react-query'

import { API_BASE_URL } from '@/config'
import type AddressType from '@/@types/types'

const fetchAddressByPostalCode = async (
  postalCode: string,
): Promise<AddressType> => {
  const response = await fetch(`${API_BASE_URL}/${postalCode}`)
  if (!response.ok) {
    throw new Error('Erro ao obter endereço')
  }

  return response.json()
}

export const useAddressByPostalCode = () =>
  useMutation({
    mutationFn: fetchAddressByPostalCode,
  })
