import React from 'react';
import styles from '../../styles/sectionImage.module.scss';
import Image from 'next/image';
import { Card } from '@/types/card.type';

interface sectionProps extends Card {
  reverse?: boolean 
}

export const SectionImage = ({ heading, text, img, bgColour, reverse=false }: sectionProps) => {
  return (
    <>
      <section style={{backgroundColor: bgColour}} className={styles.alt_card}>
        <div className={`${styles.container} ${reverse && 'flex-row-reverse'} md:flex`}>
          <div className={`w-full ${reverse && 'lg:ml-20'}`}>
            <h2>{heading}</h2>
            <p className='my-6'>{text}</p>
          </div>
          <div className={`w-full ${!reverse && 'lg:ml-20'}`}>
            <Image  src={img} height={500} width={500} alt="" />
          </div>
        </div>
      </section>
    </>
  )
}
