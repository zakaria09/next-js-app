import { Box, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Image from "next/image"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Slide } from 'react-slideshow-image'
import { padding } from '@mui/system'
import { InstaPost } from '@/pages/gallery'

export const ImageDialog = ({ id, open, onClose }: any) => {

  const { data, error, isLoading } = useSWR(
    `https://v1.nocodeapi.com/zakaria09/instagram/EsbcLkLfkmUCHwhh/singleFeed?id=${id}`,
    (url: any) => axios.get(url).then((resp: { data: InstaPost }) => resp.data)
  );

  if (isLoading) return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          height: "400px",
          width: "400px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <CircularProgress />
      </Box>
    </Dialog>
  );

  const renderMedia = (post: InstaPost | undefined) => {
    if (!post) return;
    if (post.media_type === 'CAROUSEL_ALBUM') 
      return (
        <Slide>
          {post.children?.data.map((post) => (
            <LazyLoadImage
              key={post.id}
              src={post.media_url}
              alt=""
              height={500}
              width={500}
            />
          ))}
        </Slide>
      );
    else if (post.media_type === 'IMAGE') 
      return (
        <LazyLoadImage
          key={post.id}
          src={post.media_url}
          alt=""
          height={500}
          width={500}
        />
      );
    else if (post.media_type === 'VIDEO') 
      return <video loop autoPlay src={post.media_url}></video>;
  };

  return (
    <>
      <Dialog maxWidth="xs" open={open} onClose={onClose}>
        <DialogContent>{renderMedia(data)}</DialogContent>
        <DialogContentText >
          <div className="my-5 mx-6">
            <span>{data?.caption}</span>
          </div>
        </DialogContentText>
      </Dialog>
    </>
  );
}
