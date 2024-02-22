/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useAddressByPostalCode } from '@/hooks'
import { AddressCard, Button, Input } from '@/components'
import { FormSearchInputs, searchCepSchema } from '@/utils'

import styles from './FormSearchScreen.module.scss'

export const FormSearchScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSearchInputs>({
    resolver: zodResolver(searchCepSchema),
  })

  const { mutate, data, isPending } = useAddressByPostalCode()

  const onSubmit: SubmitHandler<FormSearchInputs> = ({ postalCode }) => {
    mutate(postalCode)
  }

  return (
    <main className={styles.main_container}>
      <h1>Consulte seu CEP</h1>

      <form className={styles.form_content} onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={!!errors.postalCode}
          errorMessage={
            errors.postalCode?.message ? errors.postalCode.message : ' '
          }
          htmlFor="cep"
          label="00000000"
          {...register('postalCode')}
        />

        <Button text="Buscar" type="submit" />
      </form>

      {!!data && !data?.statusCode && <AddressCard address={data} />}
      {isPending && <Skeleton height={433} width={402} />}

      {data?.statusCode && (
        <h2 className={styles.text_error}>{data.message}</h2>
      )}
    </main>
  )
}
