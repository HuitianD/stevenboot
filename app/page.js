"use client"; 

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

// Here we introduce the db we just had, and the Firestore function
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  // Use useState to save the array obtained from Firestore
  const [crewMembers, setCrewMembers] = useState([]);

  // Gets the data from Firestore when the component loads
  useEffect(() => {
    async function fetchData() {
      try {
        // define collection as "crewMembers"
        const querySnapshot = await getDocs(collection(db, "crewMembers"));
        // Convert each document into the object we need
        const membersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCrewMembers(membersData);
      } catch (error) {
        console.error("Error fetching crew data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="https://upload.wikimedia.org/wikipedia/en/9/9e/One_Piece_Logo.png"
          alt="One Piece logo"
          width={200}
          height={60}
          priority
        />
        <h1 className={styles.title}>Meet the Straw Hat Pirates</h1>
        <p className={styles.subtitle}>
          The legendary crew from the anime <em>"One Piece"</em>. Explore their
          roles and personalities!
        </p>

        {/* Render with the crewMembers array we got from the database */}
        <div className={styles.crewGrid}>
          {crewMembers.map((member) => (
            <div key={member.id} className={styles.flipCard}>
              <div className={styles.flipCardInner}>
                {/* Front Side */}
                <div className={styles.flipCardFront}>
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={200}
                    height={200}
                    className={styles.characterImage}
                  />
                  <h2>{member.name}</h2>
                  <p>{member.description}</p>
                </div>
                {/* Back Side */}
                <div className={styles.flipCardBack}>
                  <h2>{member.name}</h2>
                  <p className={styles.skillLabel}>Signature Skill:</p>
                  <p className={styles.skillName}>{member.skill}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer / Credits */}
      <footer className={styles.footer}>
        <a
          href="https://en.wikipedia.org/wiki/Straw_Hat_Pirates"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.learnMore}
        >
          Learn more about the Straw Hat Pirates
        </a>
      </footer>

      <div className={styles.designerLeft}>designer: Steven</div>
      <div className={styles.designerRight}>designed for fullstack application</div>
    </div>
  );
}
