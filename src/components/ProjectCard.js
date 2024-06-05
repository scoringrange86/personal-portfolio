import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, externalLink }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} alt={title}/>
        <div className="proj-txtx">
        <a href={externalLink} style = {{color: 'inherit',
  textDecoration: 'inherit'}}
  target="_blank" rel="noopener noreferrer">
          <h4>{title}</h4>
          <span>{description}</span>
          </a>
        </div>
      </div>
    </Col>
  )
}
