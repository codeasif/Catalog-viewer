import React, { useState, useEffect } from 'react';
import { Grid, Button, IconButton, Typography } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import images from '../data.json';


export default function CatalogViewer() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);

  useEffect(() => {
    let interval: string | number | NodeJS.Timer | undefined;

    if (isSlideshowActive) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isSlideshowActive]);

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleSlideshowToggle = () => {
    setIsSlideshowActive((prevState) => !prevState);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img
            src={images[currentImageIndex].src}
            alt={`Image ${images[currentImageIndex].id}`}
            style={{ width: '100%', maxHeight: 400 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {images[currentImageIndex].details}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handlePrevious}>Previous</Button>
          <Button onClick={handleNext}>Next</Button>
          <IconButton onClick={handleSlideshowToggle}>
            {isSlideshowActive ? <Pause /> : <PlayArrow />}
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          {images.map((image, index) => (
            <IconButton
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              style={{
                filter:
                  index === currentImageIndex ? 'none' : 'grayscale(100%)',
              }}
            >
              <img
                src={image.src}
                alt={`Thumbnail ${image.id}`}
                style={{ width: 50, height: 50 }}
              />
            </IconButton>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

