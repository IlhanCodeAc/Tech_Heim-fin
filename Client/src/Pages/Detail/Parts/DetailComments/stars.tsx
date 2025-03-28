import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

interface HalfRatingProps {
  setRating: (rating: number) => void;
}

export default function HalfRating({ setRating }: HalfRatingProps) {
  return (
    <Stack spacing={1}>
      <Rating
        name="full-rating"
        defaultValue={3} // Default value can be adjusted
        precision={1} // Only allows full stars
        onChange={(_, newValue) => {
          setRating(newValue || 0);
        }}
      />
    </Stack>
  );
}
