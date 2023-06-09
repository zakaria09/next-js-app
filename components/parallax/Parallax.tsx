import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import Image from "next/image";

export default function Parallax({ imgUrl, headings }: { imgUrl: string, headings: Array<{ text: string; delay: number }>  }) {
  return (
    <div className="parallax-section">
      <Image
        src={imgUrl}
        className={`parallax-section__bg`}
        objectPosition="center"
        width={800}
        height={800}
        alt=""
      />
      <div className="parallax-section__textarea">
        <TypeAnimation
          sequence={[
            ...headings.map((h) => [h.text, h.delay]).flat(), // Types 'One'
          ]}
          wrapper="div"
          cursor={true}
          repeat={Infinity}
          style={{ fontSize: "2em" }}
          className="parallax-section__textarea__heading"
        />
      </div>
    </div>
  );
}
