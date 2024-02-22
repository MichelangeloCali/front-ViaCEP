import { useEffect, useRef } from 'react'
import L from 'leaflet'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useLocationMap } from '@/hooks'
import type AddressType from '@/@types/types'
import styles from './AddressCard.module.scss'

type AddressPropsType = {
  address?: AddressType
}

export const AddressCard = ({ address }: AddressPropsType) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const { mutate, data, isPending, isError } = useLocationMap()

  useEffect(() => {
    if (!address || !address.postalCode) return

    mutate(address.postalCode)
  }, [address?.postalCode])

  useEffect(() => {
    if (!data || data.length === 0 || mapRef.current) return

    const { lat, lon } = data[0]

    const map = L.map(mapContainerRef.current!, {
      center: [lat, lon],
      zoom: 13,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    if (address) {
      L.marker([lat, lon]).addTo(map).bindPopup(address.street).openPopup()
    }

    mapRef.current = map
  }, [data])

  return (
    <div className={styles.address_content}>
      {mapContainerRef && (
        <div
          ref={mapContainerRef}
          style={{
            width: '100%',
            height: '300px',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        >
          {(isPending || isError || !address) && <Skeleton height={'109%'} />}
        </div>
      )}

      {!isError && address ? (
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
