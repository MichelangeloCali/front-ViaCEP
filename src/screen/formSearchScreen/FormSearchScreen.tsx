/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AddressCard, Button, Input } from '@/components'
import { creatSearchCepData, searchCepSchema } from '@/utils'

import styles from './FormSearchScreen.module.scss'

const address = {
  zipcode: '83005070',
  street: 'Rua Margarida de Araujo Franco',
  neighborhood: 'Carioca',
  city: 'São José dos Pinhais',
}

export const FormSearchScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<creatSearchCepData>({
    resolver: zodResolver(searchCepSchema),
  })

  const onSubmit = (data: creatSearchCepData) => {
    // data to send to data base or trigger mails API
    console.log('Form value = ', data)
  }

  return (
    <main className={styles.main_container}>
      <h1>Consulte seu CEP</h1>

      <form className={styles.form_content} onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={!!errors.cep}
          errorMessage={errors.cep?.message ? errors.cep.message : ' '}
          htmlFor="cep"
          label="00000-000"
          {...register('cep')}
        />

        <Button text="Buscar" type="submit" />
      </form>

      <AddressCard address={address} />
      {/* <AddressCard /> */}
    </main>
  )
}
