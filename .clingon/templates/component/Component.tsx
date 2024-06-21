import './ResourceName.styles.css'

export interface ResourceNameProps {
  message: string
}

export function ResourceName({ message }: ResourceNameProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  )
}
