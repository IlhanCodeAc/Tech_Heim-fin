import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

interface HalfRatingProps {
  setRating: (rating: number) => void; // Add a prop to handle rating update
}

export default function HalfRating({ setRating }: HalfRatingProps) {
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        defaultValue={2.5}
        precision={0.5}
        onChange={(_, newValue) => {
          setRating(newValue || 0); // Update rating in parent component
        }}
      />
    </Stack>
  );
}
