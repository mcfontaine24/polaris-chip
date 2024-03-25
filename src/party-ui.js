import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class PartyUI extends DDD {

  static get tag() {
    return 'party-ui';
  } 

  constructor() {
    super();
    this.players = [];
    this.newPlayerName = '';
  }

  static get styles() {

    return css`

      :host {
        display: inline-flex;
      }

      .lightbg {
        background-color: var(--ddd-theme-default-beaver70);
        padding: 10px;
        margin: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
      }

      .darkbg {
        background-color: var(--ddd-theme-default-beaverBlue);
        padding: 50px;
        margin-top: 20px;
        margin-bottom: 20px;
      }

      .addchar {
        border: 3px dashed black;
        background-color: transparent;
        padding: 30px 30px;
        font-size: 50px;
        cursor: pointer;
      }

      .charlist {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      .chars {
        text-align: center;
        margin: 10px;
      }

      .name {
        color: white;
        font-family: 'Orbitron';
        margin-top: 10px;
      }

      .nameline {
        border-top: 3px solid #bbb;
        margin: 0px 20px;
      }

      .savebutton {
        background-color: var(--ddd-theme-default-lightGreen);
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        margin-top: 20px;
      }
    `;
  }
  
  addPlayer() {
    if (this.newPlayerName.trim() !== '') {
      this.players = [...this.players, this.newPlayerName.trim()];
      this.newPlayerName = ''; // Clear input field
    }
  }

  deletePlayer(index) {
    this.players.splice(index, 1);
    this.requestUpdate(); // Trigger lit-element to re-render
  }

  saveParty() {
    // Perform save action or dispatch event to handle saving
    console.log('Saving party:', this.players);
    // Trigger confetti animation or any other success indication
  }

  render() {
    return html`
      <div class="project1">
        <div class="lightbg">
          <div class="darkbg">
            <div class="charlist">
              ${this.players.map((player, index) => html`
                <div class="chars">
                  <rpg-character hat="random" seed="${player}"></rpg-character>
                  <div class="name">${player}</div>
                  <div class="nameline"></div>
                  <button @click="${() => this.deletePlayer(index)}">Delete</button>
                </div>
              `)}
              <div class="chars">
                <input type="text" .value="${this.newPlayerName}" @input="${(e) => this.newPlayerName = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '')}">
                <button @click="${this.addPlayer}" class="addchar">+</button>
              </div>
            </div>
            <button @click="${this.saveParty}" class="savebutton">Save members to party</button>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      players: { type: Array },
      newPlayerName: { type: String }
    };
  }
}

customElements.define(PartyUI.tag, PartyUI);
