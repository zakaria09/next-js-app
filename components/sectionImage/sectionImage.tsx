import React, { useContext } from 'react';
import styles from '../../styles/sectionImage.module.scss';
import Image from 'next/image';
import { Card } from '@/types/card.type';
import ContentEditable from 'react-contenteditable';
import { AuthContext } from '@/context/AuthUserContext';

interface sectionProps extends Card {
  id: string;
  reverse?: boolean;
  changeText?: (val: string, id: string, type: "text" | "heading") => void;
}

export const SectionImage = ({ id, heading, text, img, bgColour, reverse=false, changeText }: sectionProps) => {
  const auth: any = useContext(AuthContext);

  const handleChange = (e: any, id: string, type: 'text' | 'heading') => {
    if (changeText) changeText(e.target.value, id, type)
  };
  
  return (
    <>
      <section
        style={{ backgroundColor: bgColour }}
        className={styles.alt_card}
      >
        <div
          className={`${styles.container} ${
            reverse && "flex-row-reverse"
          } md:flex`}
        >
          <div className={`w-full ${reverse && "lg:ml-20"}`}>
            <ContentEditable
              html={heading}
              disabled={!auth.user}
              onChange={(e) => handleChange(e, id, 'heading')}
              className="my-6"
              tagName="h2"
            />
            <ContentEditable
              html={text}
              disabled={!auth.user}
              onChange={(e) => handleChange(e, id, 'text')}
              className="my-6"
              tagName="p"
            />
          </div>
          <div className={`w-full ${!reverse && "lg:ml-20"}`}>
            <Image src={img} height={500} width={500} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
