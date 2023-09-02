import { ReactNode } from 'react'
import styles from 'shared/ui/s-button/styles.module.scss'

interface IProps {
  appearance?: 'primary' | 'secondary'
  children: ReactNode
}

export const SButton = ({ appearance = 'primary', children }: IProps) => {
  const classes = `${styles['s-button']} ${styles[`s-button--${appearance}`]}`

  return (
    <button className={classes}>{children}</button>
  )
}