import React from 'react'
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="Footer">
    <span className="madeBy">
    Made by
    <a className="Minh" href="https://goldenkairos.github.io/personal_page/"> Minh Seikel </a>
    and 
    <a className="Wanjun" href="https://github.com/wjlan"> Wanjun Lan   </a>
    </span>
    |
    <span className="source">
    <a className="SourceCode" href="https://github.com/goldenkairos/feeling-well-app">  Source Code </a>
    </span>
    </footer>
  )
}
