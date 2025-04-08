import React from 'react';
import Image from 'next/image';
import { Card as MuiCard, CardContent, CardMedia, Typography } from '@mui/material';

interface CardProps {
  url: string;
  name: string;
  shortDescription: string;
}

const Card: React.FC<CardProps> = ({ url, name, shortDescription }) => {
  return (
    <MuiCard sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia sx={{ position: 'relative', height: 200 }}>
        <Image
          src={url}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </CardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortDescription}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card; 