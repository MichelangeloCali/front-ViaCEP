import { useMutation } from '@tanstack/react-query'

const fetchLocationMap = async (postalCode: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&format=json`,
  )
  if (!response.ok) {
    throw new Error('Erro ao obter coordenadas')
  }
  const data = await response.json()

  return data
}

export const useLocationMap = () =>
  useMutation({
    mutationFn: fetchLocationMap,
  })
