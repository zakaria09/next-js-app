import Head from 'next/head'
import Link from 'next/link'
import Navigation from '@/components/navigation/navigation'
import axios from "axios"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import styles from '../styles/gallery.module.scss';
import React from 'react'
import { ImageDialog } from '@/components/dialog/imageDialog'

export const getStaticProps = async () => {
  let resp;
  try {
    const token = process.env.NEXT_PUBLIC_INSTA_TOKEN;
    const { data } = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=24&access_token=${token}`);
    resp = data;
  } catch (error) {
    resp = [];
  }
  return {
    props: {
      instaImages: resp
    }
  }
}

export default function Gallery({ instaImages }: any) {
  const [open, setOpen] = React.useState(false);
  const [ postId, setPostId ] = React.useState<any>();

  const handleClickOpen = (id: string) => {
    setPostId(id);
    console.log(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Head>
        <title>Zulu Vision</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='layout'>
        <section >
          <Container >
            <div className={styles['insta-grid-wrapper']}>
              { 
                instaImages.data.map((img, i) =>
                <>
                  <Card 
                    className={styles['insta-grid-wrapper__card']}  
                    sx={{ maxWidth: 400 }}
                    onClick={() => handleClickOpen(img.id)}
                    key={img.id}>
                    <CardMedia
                      component={'img'}
                      className={styles['insta-grid-wrapper__post']}
                      src={img.media_url} 
                      alt={img.caption} 
                      key={i} 
                    ></CardMedia>
                  </Card>
                </>)
              }
            </div>
            <ImageDialog open={open} onClose={handleClose} id={postId}  />
          </Container>
        </section>
      </div>
    </>
  )
}