import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthUserContext";
import styles from "../styles/about.module.scss";
import { SectionImage } from "@/components/sectionImage/sectionImage";
import CardForm from "@/components/cardForm/cardForm";
import ContentEditable from "react-contenteditable";
import { Card } from "@/types/card.type";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { Button, CircularProgress } from "@mui/material";
import Chrome from "react-color/lib/components/chrome/Chrome";
import { ColorResult } from "react-color";

interface firebaseCards extends Card {
  id: string;
}

export default function About() {
  const auth: any = useContext(AuthContext);
  console.log(auth)

  const [cards, setCards] = useState<firebaseCards[]>([]);
  const [aboutText, setAbouText] = useState<
    Array<{ id: string; text: string }>
  >([]);

  const [bgColour, setBgColour] = useState<Array<{ color: string; id: string }>>([])
  const [isAuth, setAuth] = useState<boolean>();

  useEffect(() => {
    setAuth(auth.user ? true: false);
  }, [auth])

  useEffect(() => {
    const aboutCardsRef = collection(db, "about_card");
    getDocs(aboutCardsRef)
      .then((querySnapshot) => {
        const data: any = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(data);
        setBgColour(data.map((d: any) => ({ color: d.bgColour, id: d.id })));
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    const aboutTextRef = collection(db, "about_text");
    getDocs(aboutTextRef)
      .then((querySnapshot) => {
        const data: any = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAbouText(data);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  const handleChange = (e: any, id: string) => {
    const newValue = e.target.value;
    setAbouText((prev) => [
      {
        id,
        text: newValue,
      },
      ...prev.filter((a) => a.id !== id),
    ]);
    const aboutRef = doc(db, "about_text", id);
    setDoc(aboutRef, {
      id,
      text: newValue,
    });
  };

  const handleNewCard = (newCard: Card) => {
    const imageRef = ref(storage, `about/cards/${v4()}`);
    const regex = /data:.*base64,/;
    setCards((prev) => [...prev, { ...newCard, id: v4() }]);
    uploadString(imageRef, newCard.img.replace(regex, ""), "base64").then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const docRef = doc(db, "about_card", v4());
          setDoc(docRef, { ...newCard, img: url });
        });
      }
    );
  };

  const handleChangeText = (
    text: any,
    id: string,
    type: "text" | "heading"
  ) => {
    const aboutRef = doc(db, "about_card", id);
    if (type === "text")
      updateDoc(aboutRef, {
        text: text,
      });
    else if (type === "heading")
      updateDoc(aboutRef, {
        heading: text,
      });
  };

  const handleBgColour = (colour: ColorResult, id: string) => {
    setBgColour((prev) => [
      ...prev.filter((c) => c.id !== id),
      {
        id,
        color: colour.hex
      }
    ])
  };

  const findColor = (id: string) =>
    bgColour.find((c) => c.id === id)?.color || "#1E241F";

  const updateColour = (id: string) => {
    const aboutRef = doc(db, "about_card", id);
    updateDoc(aboutRef, {
      bgColour: findColor(id),
    });
  };

  return (
    <>
      <Head>
        <title>Zulu Vision</title>
        <meta
          name="description"
          content="Zulu Vision a platform for creativity and beautiful photos"
        />
        <meta name="og:title" content="About zulu vision" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:url"
          content="https://zulu-vision.vercel.app/about"
        />
        <meta property="og:description" content="Welcome to Zulu Vision" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={
            "https://firebasestorage.googleapis.com/v0/b/zulu-vision.appspot.com/o/about%2Fcards%2F362f6ba3-9ba4-45aa-b34d-8c0770d9e7ea?alt=media&token=add94414-3fbb-4dcb-99d0-3af682f776ce"
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="layout">
        <section>
          <section className={styles.intro}>
            <div className={`container ${styles.intro_bg}`}>
              <h1 className="intro__title">Welcome to Zulu Vision</h1>
            </div>
          </section>

          <section className="section-main">
            <div className={`${styles.container}`}>
              <h1 className={styles.header_2}>Qualiy Photos</h1>
              <div className="md:flex gap-16">
                {aboutText.length ? (
                  aboutText.map((about: any) => (
                    <div key={about.id} className={`my-6`}>
                      <ContentEditable
                        html={about.text}
                        disabled={!isAuth}
                        onChange={(e) => handleChange(e, about.id)}
                      />
                    </div>
                  ))
                ) : (
                  <CircularProgress />
                )}
              </div>
            </div>
          </section>

          {cards.map((card, index) => (
            <>
              <SectionImage
                id={card.id}
                heading={card.heading}
                text={card.text}
                img={card.img}
                bgColour={findColor(card.id)}
                reverse={(index + 1) % 2 === 0}
                key={card.id}
                changeText={handleChangeText}
              />
              {isAuth && (
                <div className="flex justify-center p-4">
                  <Chrome
                    color={findColor(card.id)}
                    onChange={(colour) => handleBgColour(colour, card.id)}
                    disableAlpha={true}
                  />
                </div>
              )}
              {isAuth && (
                <div className="flex justify-center p-4">
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => updateColour(card.id)}
                  >
                    Save Background Colour
                  </Button>
                </div>
              )}
            </>
          ))}

          {isAuth && (
            <div className={styles.container}>
              <CardForm newCard={handleNewCard} />
            </div>
          )}

          {/* remove layout hack */}
          {!isAuth && <div className={styles.space}></div>}
        </section>
      </div>
    </>
  );
}
