'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchTerm: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, searchTerm }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      showFirstButton
      showLastButton
    />
  );
};

export default Pagination; 