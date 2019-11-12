import React from 'react'
import { Link } from 'react-router-dom';

const ListGroupItem = ({ link, name }) => (
  <Link to={link}><button type="button" class="list-group-item list-group-item-action">{name.split("/")[0]}<br />{name.split("/")[1]}</button></Link>
)

export default ListGroupItem