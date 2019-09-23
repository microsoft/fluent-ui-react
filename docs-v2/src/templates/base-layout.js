import React from "react"
import {Navbar} from "../doc-components/navbar"
import "./base-layout.css"

export function BaseLayout({children, rail}) {
  return (
    <>
      <Navbar />
      <div className="sui-base-layout has-navbar">
        <div className="sui-base-layout__body">
          {rail && <div className="sui-base-layout__rail">{rail}</div>}
          <main className="sui-base-layout__content-scroller">
            <div className="sui-base-layout__content">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}
