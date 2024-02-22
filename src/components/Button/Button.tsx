import { ButtonHTMLAttributes } from 'react'

import styles from './Button.module.scss'

type ButtonPropsType = {
  text?: string
  disabled?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ text, disabled, ...props }: ButtonPropsType) => {
  return (
    <button
      disabled={disabled}
      aria-label="Buscar CEP"
      className={styles.button}
      {...props}
    >
      {text}
    </button>
  )
}
