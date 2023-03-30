import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
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
  // const [ post, setPost ] = useState<InstaPost | undefined>()

  const { data, error, isLoading } = useSWR(`https://graph.instagram.com/${id}
?fields=caption,media_url,thumbnail_url,id,media_type,timestamp&
access_token=IGQVJWcWdmM1RKNEVkZA0M3TnV3akpDOGVURG9MWjJ3ZAXc1ZAjJ3R2ZAuY2p6VHM3YWFUX1ltN3FQX2tIMC1EU0sweGkzb2hiTlVkMVg2S0psSnJDT0J2Qm5qMVhsODJlTWdINXJLVnJJS2pFT1hEU205dQZDZD`, 
  (url: any) => axios.get(url).then(resp => resp.data))

  return (
    <Dialog maxWidth='xs' open={open} onClose={onClose}>
      {/* <DialogTitle>Subscribe</DialogTitle> */}
      <DialogContent>

        <img src={data?.media_url} alt="" />
      </DialogContent>
      <DialogContentText>
        <div className='pb-5 px-6'>
          <Typography align='left' variant="subtitle1" component="h2">
            {data?.caption}
          </Typography>
        </div>
        
      </DialogContentText>
    </Dialog>
  )
}
