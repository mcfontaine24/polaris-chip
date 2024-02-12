import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

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
    `;
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