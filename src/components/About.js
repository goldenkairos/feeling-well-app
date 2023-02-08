import React from 'react'
import NavBar from './NavBar.js'
import Footer from './Footer.js'

export default function Home() {
  return (
    <div>
          <header>
          <NavBar />
        </header>
    
    <div className="About">
    <section className="firstIntro">
      <h1 className="firstHeader">Feelings are complicated...</h1>
    </section>
    <section className="secondIntro">
      <h1 className="secondHeader">
        This is a tool for checking in with yourself using the Feeling
        Wheel method.
      </h1>
      <p className="secondParagraph">
        Designed by Gloria Willcox in 1982, the feeling wheel is a proven
        visual aid that helps people recognize, talk about, and change
        their feelings. Inspired by Joseph Zinker's ideas of conceiving
        the therapist as an artist (Zinker, 1978), and Robert Plutchik's
        comparison of emotions to colors (Plutchik's 1980), Wilcox set out
        to design the feelings wheel using the four basic emotions:
        scared, sad, mad and glad. To keep things balance between
        comfortable and uncomfortable emotions, she expanded "glad" into
        three emotions: joyful, powerful, and peaceful.
      </p>
    </section>
    <section className="thirdIntro">
      <h1 className="thirdHeader">
        The exploration of emotions is a vehicle to become aware of your
        power.
      </h1>
      <p className="thirdParagraph">
        Use the feeling wheel to hone this power and build an emotional
        vocabulary that improves your communication quality.
      </p>
    </section>
    <Footer />

  </div>
  </div>
  )
}
