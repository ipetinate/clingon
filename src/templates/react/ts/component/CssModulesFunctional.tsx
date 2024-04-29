import styles from './ResourceName.css'

export type ResourceNameProps = {
  id: string
}

export function ResourceName({ id }: Props) {
  return (
    <div id={id} className={styles.component}>
      <p className={styles.message}>Hello, I'm a component, auto generated by Clingon CLI!</p>
    </div>
  )
}
