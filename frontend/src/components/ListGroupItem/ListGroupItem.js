import React from 'react'
import { Link } from 'react-router-dom';

const ListGroupItem = ({ link, name }) => (
  <Link to={link}><button type="button" class="list-group-item list-group-item-action">{name}</button></Link>
)

export default ListGroupItem