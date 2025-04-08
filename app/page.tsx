import React from 'react';
import { connectDB } from '@/lib/db';
import { Image } from '@/models/Image';
import Card from '@/components/Card';
import { Container, Grid, Box } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';

interface HomePageProps {
  searchParams: {
    search?: string;
    page?: string;
  };
}

const ITEMS_PER_PAGE = 6;

async function getImages(searchTerm: string = '', page: number = 1) {
  await connectDB();
  
  const query = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { shortDescription: { $regex: searchTerm, $options: 'i' } }
        ]
      }
    : {};

  const total = await Image.countDocuments(query);
  const images = await Image.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .lean();

  return {
    images,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE)
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const searchTerm = searchParams.search || '';
  const currentPage = Number(searchParams.page) || 1;
  
  const { images, totalPages } = await getImages(searchTerm, currentPage);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <SearchBar defaultValue={searchTerm} />
      </Box>

      <Grid container spacing={3}>
        {images.map((image: any) => (
          <Grid item xs={12} sm={6} md={4} key={image._id.toString()}>
            <Card
              url={image.url}
              name={image.name}
              shortDescription={image.shortDescription}
            />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            searchTerm={searchTerm}
          />
        </Box>
      )}
    </Container>
  );
}