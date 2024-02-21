import { useQuery } from '@tanstack/react-query'

const getLocationMap = async (zipcode: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&format=json`,
  )
  if (!response.ok) {
    throw new Error('Erro ao obter coordenadas')
  }
  return response.json()
}

export const useLocationMapQuery = (zipcode: string) => {
  return useQuery({
    queryKey: [],
    queryFn: () => getLocationMap(zipcode),
  })
}
