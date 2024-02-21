// import { useEffect, useRef } from 'react'
// import L from 'leaflet'
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

// import { useLocationMapQuery } from '@/hooks'
// import type AddressType from '@/@types/types'
// import styles from './AddressCard.module.scss'

// type AddressPropsType = {
//   address?: Omit<AddressType, 'id'>
// }

// export const AddressCard = ({ address }: AddressPropsType) => {
//   const mapContainerRef = useRef<HTMLDivElement>(null)
//   const { data, isLoading, isError } = useLocationMapQuery(
//     address?.zipcode || '',
//   )

//   useEffect(() => {
//     if (!address || !data) return

//     const { lat, lon } = data[0]

//     const map = L.map(mapContainerRef.current!, {
//       center: [lat, lon],
//       zoom: 13,
//     })

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map)

//     L.marker([lat, lon]).addTo(map).bindPopup(address.street).openPopup()
//   }, [address, data])

//   return (
//     <div className={styles.address_content}>
//       <div
//         ref={mapContainerRef}
//         style={{
//           width: '100%',
//           height: '300px',
//           borderRadius: '8px',
//           marginBottom: '1rem',
//         }}
//       >
//         {(isLoading || isError || !address) && <Skeleton height={'109%'} />}
//       </div>

//       {!isLoading && !isError && address ? (
//         <>
//           <h3>
//             <span>Logradouro:</span> {address.street}
//           </h3>
//           <h3>
//             <span>Bairro:</span> {address.neighborhood}
//           </h3>
//           <h3>
//             <span>Município:</span> {address.city}
//           </h3>
//         </>
//       ) : null}
//     </div>
//   )
// }

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import type AddressType from '@/@types/types'

import styles from './AddressCard.module.scss'

type AddressPropsType = {
  address?: Omit<AddressType, 'id'>
}

export const AddressCard = ({ address }: AddressPropsType) => {
  const [loading, setLoading] = useState(true)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!address) return

    setLoading(true)

    fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${address.zipcode}&format=json`,
    )
      .then((response) => response.json())
      .then((data) => {
        const { lat, lon } = data[0]

        if (!mapRef.current) {
          const map = L.map(mapContainerRef.current!, {
            center: [lat, lon],
            zoom: 13,
          })

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map)

          mapRef.current = map
        } else {
          mapRef.current.setView([lat, lon], 13)
        }

        L.marker([lat, lon])
          .addTo(mapRef.current)
          .bindPopup(address.street)
          .openPopup()
      })
      .catch((error) => {
        console.error('Erro ao obter coordenadas do CEP:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [address])

  const clearMap = () => {
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }
    setLoading(true)
  }

  useEffect(() => {
    return clearMap
  }, [address])

  return (
    <div className={styles.address_content}>
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '300px',
          borderRadius: '8px',
          marginBottom: '1rem',
        }}
      >
        {(loading || !address) && <Skeleton height={'109%'} />}
      </div>

      {!loading && address ? (
        <>
          <h3>
            <span>Logradouro:</span> {address.street}
          </h3>
          <h3>
            <span>Bairro:</span> {address.neighborhood}
          </h3>
          <h3>
            <span>Município:</span> {address.city}
          </h3>
        </>
      ) : null}
    </div>
  )
}
