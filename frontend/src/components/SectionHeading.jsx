import { Link } from 'react-router-dom'

export default function SectionHeading({ title, linkText, href = '#' }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {linkText && (href.startsWith('/')
        ? <Link className="text-link" to={href}>{linkText} <span>→</span></Link>
        : <a className="text-link" href={href}>{linkText} <span>→</span></a>)}
    </div>
  )
}
