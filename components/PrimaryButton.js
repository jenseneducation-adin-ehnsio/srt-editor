export default function Button({title, ...rootDomAttributes}) {

  return (
    <button {...rootDomAttributes} className="primary_button">
      {title}
    </button>
  )
}