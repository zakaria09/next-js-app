import { Box, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

interface InstaPost {
  caption: string;
  media_url: string;
  media_type: 'CAROUSEL_ALBUM' | 'IMAGE' | 'VIDEO';
  id: string;
  timestamp: string;
}

export const ImageDialog = ({ id, open, onClose }: any) => {

  const { data, error, isLoading } = useSWR(
    `https://v1.nocodeapi.com/zakaria09/instagram/EsbcLkLfkmUCHwhh/singleFeed?id=${id}`,
    (url: any) => axios.get(url).then((resp) => resp.data)
  );

  return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>

      {
        isLoading && <Box sx={{ display: "flex", height: "400px", width: "400px", justifyContent: "center", alignItems: "center" }}>
          {" "}
          <CircularProgress />
        </Box>
      }

      <DialogContent>
        <img src={data?.media_url} alt="" />
      </DialogContent>
      <DialogContentText>
        <div className="pb-5 px-6">
          <Typography align="left" variant="subtitle1" component="h2">
            {data?.caption}
          </Typography>
        </div>
      </DialogContentText>
    </Dialog>
  );
}
