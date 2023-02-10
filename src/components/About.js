import React from "react";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";

export default function Home() {
  return (
    <div>
      <header>
        <NavBar />
      </header>

      <div className="About">
        <section className="firstIntro">
          <h1 className="firstHeader">Feelings are complicated...</h1>
          <p className="firstParagraph">
            The ability to identify, process, and label your emotions in a
            healthy and effective way can lead to better mental health and
            relationships. Emotional literacy can help individuals gain a
            greater understanding of themselves and the world around them,
            leading to personal growth and a more meaningful existence.
          </p>
        </section>
        <section className="secondIntro">
          <h1 className="secondHeader">
            This is a tool for checking in with yourself using the Feeling
            Wheel.
          </h1>
          <p className="secondParagraph">
            Just like tracking your food intake can give you a better
            understanding of your eating habits, logging your mood can help you
            gain insight into your emotional well-being. Regularly recording
            your mood can also serve as a tool for self-expression and
            reflection, helping you understand yourself and your feelings better
          </p>
        </section>
        <section className="thirdIntro">
          <h1 className="thirdHeader">
            The exploration of emotions is a vehicle to become aware of your
            power.
          </h1>
          <p className="thirdParagraph">
            Logging your mood can also serve as a form of self-expression and a
            tool for reflection, helping you to better understand yourself and
            your feelings. Use the feeling wheel to hone this power and build an
            emotional vocabulary that improves your communication quality.
          </p>
        </section>
        {/* <section className="fourthIntro">
          <h1 className="fourthHeader">
            The Feeling Wheel: a brilliant tool for emotional literacy.
          </h1>
          <p className="fourthParagraph">
            Designed by Gloria Willcox in 1982, the feeling wheel is a proven
            visual aid that helps people recognize, talk about, and change their
            feelings. Inspired by Joseph Zinker's ideas of conceiving the
            therapist as an artist (Zinker, 1978), and Robert Plutchik's
            comparison of emotions to colors (Plutchik's 1980), Wilcox set out
            to design the feelings wheel using the four basic emotions: scared,
            sad, mad and glad. To keep things balance between comfortable and
            uncomfortable emotions, she expanded "glad" into three emotions:
            joyful, powerful, and peaceful.{" "}
            <a href="https://allthefeelz.app/feeling-wheel/#background_story">
              Source
            </a>
          </p>
        </section> */}

        <Footer />
      </div>
    </div>
  );
}
