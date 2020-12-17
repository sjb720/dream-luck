import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { Component } from 'react';


export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      buttons: [],
      attempts: 0,
      wins: 0,
      screen: 0,
    }
  }

  componentDidMount() {
    this.cheats = false;

    if (isNaN(parseInt(window.localStorage.getItem("attempts")))) {
      window.localStorage.setItem("attempts",0)
    }

    this.setState({ attempts: parseInt(window.localStorage.getItem("attempts")) })

    var foo = new Array(1638);

    for (var i = 0; i < 1638; i++)
      foo[i] = i;

    this.correct = Math.floor(Math.random() * 1638);

    this.setState({ buttons: foo })
  }

  correctButton() {
    window.localStorage.setItem("attempts", parseInt(window.localStorage.getItem("attempts")) + 1)
    this.setState({ attempts: parseInt(window.localStorage.getItem("attempts")) })



    if (this.state.wins + 1 == 4) {
      this.setState({ screen: 2 })
      this.setState({ wins: 0 })
      return;
    }
    this.setState({ wins: this.state.wins + 1 })

    this.correct = Math.floor(Math.random() * 1638);
  }

  wrongButton() {
    window.localStorage.setItem("attempts", parseInt(window.localStorage.getItem("attempts")) + 1)
    this.setState({ attempts: parseInt(window.localStorage.getItem("attempts")) })


    this.setState({ wins: 0 })
    this.setState({ screen: 1 })

    this.correct = Math.floor(Math.random() * 1638);
  }

  render() {
    return (
      <div>
        <Head>
          <title>Dream luck</title>
        </Head>

        {this.state.screen == 0 &&
          <div>
            <div style={{ textAlign: "center", fontSize: 32 }}>Do you have dream luck?</div>
            <div style={{ textAlign: "center" }}>All you have to do is choose the right button 4 times in a row! It's that easy.</div>
            <div style={{ fontSize: 30, height: 35 }}>
              <div style={{ float: "left" }}>Wins: {this.state.wins}</div>
              <div style={{ float: "right" }}>Luck: 1/{Math.pow(1638, this.state.wins)}</div>
            </div>
            <div style={{ fontSize: 30, height: 50, textAlign: "center" }}>Attempts: {this.state.attempts}</div>
            <div style={{ fontSize: 0, textAlign: "center" }}>
              {this.state.buttons.map((id) =>
                <div class="butt" onClick={() => (this.correct == id ? this.correctButton() : this.wrongButton())}
                  style={{ width: 20, height: 20, cursor: "pointer", display: "inline-block", margin: 1, padding: 0, backgroundColor: (this.cheats == true ? (this.correct == id ? "green" : "black") : "") }}></div>)
              }
            </div>
          </div>
        }

        {this.state.screen == 1 &&
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 50, fontWeight: "bold" }}>You lost.</div>
            <div style={{ fontSize: 32 }}>Don't feel too bad. here's a fun fact to cheer you up!</div>
            <div style={{ fontSize: 32, fontStyle: "italic" }}>If the average person played this game once every second it would take them about 228,310 years to win! <span style={{ color: "green", fontWeight: "bold" }}>Keep trying you got this!</span></div>
            <button style={{ fontSize: 70, margin: 50, padding: 20, cursor: "pointer" }} onClick={() => this.setState({ screen: 0 })}>Play again!</button>
          </div>
        }

        {this.state.screen == 2 &&
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 50, fontWeight: "bold" }}>OMG YOU DID IT!!!11!11!.</div>
            <div style={{ fontSize: 32 }}>Can't believe you're seeing this screen! The odds of you getting here are about 1 in ~7.19 trillion per attempt.</div>
            <div style={{ fontSize: 32, fontStyle: "italic" }}>I guess the only real explanation is that you cheated.</div>
            <div style={{ fontSize: 20, fontStyle: "italic" }}>And that's kinda the point. <span style={{ color: "green", fontWeight: "bold" }}>right?</span></div>
            <button style={{ fontSize: 40, margin: 50, padding: 20, cursor: "pointer" }} onClick={() => this.setState({ screen: 0 })}>Do the impossible again?</button>
          </div>
        }

        <style>{`

        .butt{
          background-color: grey;
        }

        .butt:hover{
          background-color: #aaa;
        }
    `}</style>
      </div>
    )
  }
}