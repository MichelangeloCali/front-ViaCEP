import { InputHTMLAttributes, forwardRef } from 'react'

import styles from './Input.module.scss'

type InputPropsType = {
  label: string
  htmlFor: string
  error: boolean
  errorMessage: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputPropsType>(
  function Input({ label, htmlFor, error, errorMessage, ...props }, ref) {
    return (
      <div className={styles.inputContent}>
        <input
          type="number"
          id={htmlFor}
          placeholder={label}
          name={htmlFor}
          // maxLength={8} LIMITAR a 8 CARACTERES
          ref={ref}
          className={error ? `${styles.input} ${styles.error}` : styles.input}
          {...props}
        />
        <span className={styles.text_error}>{errorMessage}</span>
      </div>
    )
  },
)
