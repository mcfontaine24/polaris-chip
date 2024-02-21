import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";


export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  static get properties() {
    return {
      title: { type: String },
      link: { type: String },
      fancy: { type: Boolean, reflect: true },
    };
  }


  static get styles() {
    return css`
      :host {
        display: inline-flex;
        flex-direction: column; 
        align-items: center; 
        margin-top: 10px; 
      }

     
      span {
        background-color: #FFB6C1;
        color: black;
        font-size: 10px;
        padding: 7px;
        margin: 4px 0;
      }
      span:hover {
        background-color: #DB7093;
        border: 2px solid black;
      }
      :root,
    html,
    body {
      font-size: 16px;
      font-family: Arial, sans-serif;
      margin: 0;
      box-sizing: border-box;
    }

    h1 {
      font-size: 2em;
      margin: 0;
      padding: 0;
    }

    h3,
    h4,
    h5,
    h6 {
      margin: 8px 0;
    }

    a {
      text-decoration: none;
    }

    #cardlist {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .card {
      flex: 0 0 30%;
      max-width: 30%;
      box-sizing: border-box;
      background-color: #ecf0f1;
      color: black;
      border: 10px solid #de3163;
      border-radius: 8px;
      overflow: hidden;
      transition: 0.6s all ease-in-out;
      margin: 0 15px 20px 15px;
    }

    .card img {
      width: 100%;
      height: auto;
    }

    .card-content {
      padding: 16px;
    }

    .btn {
      background-color: #3498DB;
      color: white;
      font-size: 14px;
      text-decoration: none;
      padding: 10px;
      border-radius: 8px;
      display: inline-block;
      width: max-content;
      margin-top: 10px;
    
    }

    .btn:focus,
    .btn:hover {
      background-color: #DE3163;
    }

    ul li:hover {
      list-style: "👽";
      font-weight: bold;
      cursor: grab;
    }

    ul li:nth-child(odd) {
      background-color: #eeeeee;
    }

    ul li:nth-child(even) {
      background-color: #dddddd;
    }

    .card:hover,
    .card:focus-within {
      opacity: 1;
      outline: 2px solid purple;
      outline-offset: 16px;
    }

    .change-bg-color {
      background-color: #f58ec5;
      color: black;
    }

    .original-color {
      background-color: white !important;
      color: black;
    }

    :host([fancy]) {
      display: block;
      background-color: pink;
      border: 2px solid fuchsia;
      box-shadow: 10px 5px 5px red;
    }

    @media (max-width: 800px) and (min-width: 501px) {
      .details-button {
        display: inline-block;
      }
    }

    @media (max-width: 500px) {
      .card {
        max-width: 100%;
      }

      .details-button {
        display: inline-block;
      }
    `;
    }
  }

  constructor() {
    super();
    this.fancy = false;
  }

  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  render() {
    return html`
      <a href="${this.link}">
        <span @click="${this.handleClick}">${this.title}</span>
      </a>
    `;
  }

  handleClick() {
    const actions = {
      'Duplicate Card': () => this.duplicateCard(),
      'Change Title': () => this.changeTitle(),
      'Change Image': () => this.changeImage(),
      'Change Background Color': () => this.changeBgColor(),
      'Remove Last Card': () => this.removeLastCard(),
    };

    const action = actions[this.title];
    if (action) action();
  }

  duplicateCard() {
    console.log('Duplicate card clicked');
    const cardList = document.getElementById('cardlist');
    if (cardList.childElementCount < 10) {
      const currentCard = this.closest('.card');
      const newCard = currentCard.cloneNode(true);
      cardList.appendChild(newCard);
    }
  }

  changeTitle() {
    console.log('Change title clicked');
    const title = this.closest('.card').querySelector('h2');
    title.textContent = 'HAX PSU';
  }

  changeImage() {
    console.log('Change image clicked');
    const card = this.closest('.card');
    const image = card.querySelector('img');
    image.src =
      'https://content.sportslogos.net/logos/33/801/full/penn_state_nittany_lions_logo_secondary_19963011.png';
    image.alt = 'New Image';
  }

  changeBgColor() {
    console.log('Change background color clicked');
    const cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
      card.classList.toggle('change-bg-color');
    });

    const changeBgColorButton = document.querySelector('.change-bg-color');
    changeBgColorButton.classList.toggle('original-color');
  }

  removeLastCard() {
    console.log('Remove last card clicked');
    const cardList = document.getElementById('cardlist');
    if (cardList.childElementCount > 1) {
      cardList.lastElementChild.remove();
    }
  }
}
globalThis.customElements.define(MyCard.tag, MyCard);