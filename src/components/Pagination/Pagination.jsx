import React from 'react';
import { Typography, Button } from '@mui/material';

import useStyles from './styles';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const classes = useStyles();
  const isPrevEnabled = currentPage !== 1;
  const isNextEnabled = currentPage !== totalPages;

  const handlePrev = () => {
    if (isPrevEnabled) setPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    if (isNextEnabled) setPage((prevPage) => prevPage + 1);
  };

  if (totalPages === 0) return null;

  return (
    <div className={classes.container}>
      <Button disabled={!isPrevEnabled} onClick={handlePrev} className={classes.button} variant="contained" color="primary" type="button">Prev</Button>
      <Typography variant="body1" className={classes.pageNumber}>{currentPage} / {totalPages}</Typography>
      <Button disabled={!isNextEnabled} onClick={handleNext} className={classes.button} variant="contained" color="primary" type="button">Next</Button>
    </div>
  );
};

export default Pagination;
