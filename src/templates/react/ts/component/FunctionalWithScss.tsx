import './ResourceName.scss'

export type ResourceNameProps = {
  id: string
}

export function ResourceName({ id }: Props) {
  return (
    <div id={id} className="component">
      <p className="message">Hello, I'm a component, auto generated by Clingon CLI!</p>
    </div>
  )
}