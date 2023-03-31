import Head from "next/head";
import Navigation from "@/components/navigation/navigation";
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
} from "firebase/firestore";
import firebase_app, { db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { Button, CircularProgress } from "@mui/material";
import photo from "../public/img/459900120008.jpg";

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
        <meta
          property="og:description"
          content="Welcome to Zulu Vision"
        />
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
                heading={card.heading}
                text={card.text}
                img={card.img}
                bgColour={card.bgColour}
                reverse={(index + 1) % 2 === 0}
                key={card.id}
              />
              {isAuth && (
                <div>
                  <Button
                    className="bg-red-900"
                    type="button"
                    variant="contained"
                  >
                    Delete
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
        </section>
      </div>
    </>
  );
}
