import React from 'react'
import {Link} from "react-router-dom";
import {Pagination,PaginationItem} from '@material-ui/lab'
import useStyles from './styles'
import { useSelector } from 'react-redux';

const Paginations = ({page}) => {

  const {numberOfPages } = useSelector((state) => state.products)
  const classes = useStyles();
  
  return (
    <Pagination 
      classes={{ul: classes.ul}}
      count={numberOfPages}  
      page={Number(page) || 1}
      variant='outlined'
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/products?page=${item.page}`}/>
      )}
    />
  )
}

export default Paginations
