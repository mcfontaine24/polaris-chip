import { LitElement, html, css, render } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import "@lrnwebcomponents/type-writer/type-writer.js";

export class PartyUI extends DDD {

  static get tag() {
    return 'party-ui';
  } 

  constructor() {
    super();
    this.players = ["You", "ENTER"];
    this.numChar = 1;
    this.startIndex = 0;
    this.ablaze = false;
    this.backArrowBool = false;
    this.forwardArrowBool = false;
    this.fireText = "> FIRE IN THE HOLE!";
    this.errorText = "ERROR 00: SAFE FROM ERRORS";
    this.successText = "ERROR 404: JOURNEY NOT STARTED";
    this.title = "<PRESS START>";
  }

  static get styles() {

    return css`

      :host {
        display: flex;
        background-image: var(--background-image-url, url(
          "https://cdn.discordapp.com/attachments/696410557300998244/1223703432381202552/background_thingy.png?ex=661ad1a1&is=66085ca1&hm=0fe027db679bfaf2586b9e5159984e8fc3f043a177e6a57a6fc3a28bd3f0b144&"
        ));
        background-repeat: no-repeat;
        background-size: cover;
        justify-content: center; 
        align-items: center; 
        height: 100vh;
      }

      /* Background changes when ablaze is set to true */
      :host([ablaze]) .uibg {
        background-color: #420300;
        border-color: var(--ddd-theme-default-roarGolden);
        background-image: url("https://media4.giphy.com/media/WE066ErCk0Z91fLgaJ/giphy.gif?cid=6c09b952q3jdeclmtmluith4nr4mwfbf680vn9j9qmr8c6pz&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s");
        background-repeat: no-repeat;
        background-size: cover;
      }

      /* If forward and back arrow are able to be used, this change occurs */
      :host([backArrowBool]) .backarrow {
        opacity: 1;
        color: white;
      }
      :host([forwardArrowBool]) .forwardarrow {
        opacity: 1;
        color: white;
      } 
      :host([backArrowBool]) .backarrow:focus {
        animation: blinker .5s linear 3;
      }   
      :host([backArrowBool]) .backarrow:hover {
        animation: blinker .5s linear 3;
      }   
      :host([forwardArrowBool]) .forwardarrow:focus{
        animation: blinker .5s linear 3;
      }
      :host([forwardArrowBool]) .forwardarrow:hover{
        animation: blinker .5s linear 3;
      }

      /* ignore this it's a secret :) */
      .secret {
        position: relative;
        top: 100px;
        left: 170px;
        
        padding: 5px;
        border: transparent;
        background-color: transparent;
        color: white;
      }

      .uibg {
        background-color: var(--ddd-theme-default-beaverBlue);
        padding: var(--ddd-spacing-4);
        height: 525px;
        width: 975px;
        display: flex;
        border: var(--ddd-theme-default-nittanyNavy) 20px outset;

        flex-direction: column;
        align-items: center;
        overflow: hidden;
      }

      .bgspacing {
        background-color: transparent;
        height: 510px;
        width: 925px;
        margin-top: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
      }

      .addbtn {
        border: var(--ddd-spacing-1) dashed white;
        padding: var(--ddd-spacing-3) var(--ddd-spacing-3);
        text-align: center;
        color: white;
        font-family: "Press Start 2P", system-ui;
        margin-right: var(--ddd-spacing-6);
        background-color: transparent;

        transition: .3s all ease-in-out;
      }

      .addsymbl {
        margin: var(--ddd-spacing-6);
        font-size: 50px;
        font-family: "Press Start 2P", system-ui;
      }
      
      .numchar {
        font-size: 18px;
        font-family: "Press Start 2P", system-ui;
      }

      .charlist {
        display: flex;
        justify-content: center;
      }

      .chars {
        text-align: center;
      }

      .character-wrapper {
        margin-bottom: var(--ddd-spacing-3);
        transition:
          rotate 2s,
          scale 2s;
      }

      .character-wrapper:hover,
      .character-wrapper:focus{
        animation: jump .5s ease infinite;
      }

      .nametf {
        background: transparent;
        color: white;
        font-family: "Press Start 2P", system-ui;
        text-align: center;
        border: transparent;
        font-size: 25px;
        width: 150px;
        margin-top: var(--ddd-spacing-4);
        outline: none;
      }

      .nameline {
        border-top: var(--ddd-spacing-1) solid var(--ddd-theme-default-limestoneGray);
        margin: var(--ddd-spacing-0) var(--ddd-spacing-5);
      }

      .btnwrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: var(--ddd-spacing-3);
      }

      .removebtn {
        background: transparent;
        border: transparent;
        color: white;
        font-size: 15px;
        font-family: "Press Start 2P", system-ui;
      }

      .bottombtnwrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 40%;
      }
      
      .title,
      .finishbtn,
      .firebtn {
        text-align: center;
        margin-top: var(--ddd-spacing-8);
        background: transparent;
        border: transparent;
        color: white;
        font-size: 30px;
        font-family: "Press Start 2P", system-ui;
      }

      .errorText,
      .successText {
        text-align: center;
        font-size: 30px;
        font-family: "Press Start 2P", system-ui;
        overflow-wrap: break-word;
        width: 925px;
        margin-left: var(--ddd-spacing-11);
        margin-top: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2);
      }
      .errorText {
        color: var(--ddd-theme-default-error);
        background-color: var(--ddd-theme-default-roarGolden);
        border: var(--ddd-theme-default-error) 5px dashed;
      }
      .successText {
        color: var(--ddd-theme-default-opportunityGreen);
        background-color: var(--ddd-theme-default-futureLime);
        border: var(--ddd-theme-default-opportunityGreen) 5px dashed;
      }

      .backarrow,
      .forwardarrow {
        font-family: "Press Start 2P", system-ui;
        font-size: 65px;
        color: black;
        opacity: .2;
        margin-top: var(--ddd-spacing-20);
        background-color: transparent;
        border:  transparent;
      }

      .title {
        font-size: 50px;
        animation: blinker2 1s infinite;
      }
      
      .removebtn:focus,
      .removebtn:hover,
      .finishbtn:focus,
      .finishbtn:hover,
      .firebtn:focus,
      .firebtn:hover {
        animation: blinker .5s linear 3;
      }
      
      .addbtn:focus,
      .addbtn:hover {
        color: var(--ddd-theme-default-potential50);
        border-color: var(--ddd-theme-default-potential50);
      }

      /* hover over buttons blinker */
      @keyframes blinker {
        50% {
          opacity: 0;
        }
      }
      /* title infinite blinker */
      @keyframes blinker2 {
        0%, 50% {
          opacity: 0;
        }
        51%, 100% {
          opacity: 1;
        }
      }
      /* hover over players jump */
      @keyframes jump {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-20px);
        }
      }
    `;
  }

  //Makes it rain confetti and makes the players animate when finishbtn is pressed
  makeItRain() {
    
    const error = new Audio('https://www.myinstants.com/media/sounds/error_CDOxCYm.mp3');

    //Success "screen"
    if (!this.players.includes("ENTER")) {
      const newList = this.players.slice(1);
      this.successText = newList.toString().toUpperCase() + " HAVE SUCCESSFULLY BEEN ADDED TO YOUR PARTY!";

      //Animates characters
      this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
        player.setAttribute('walking', '');
      });

      this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
        player.setAttribute('hat', 'random');
      });

      this.clearError();

      const success = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/success.mp3');
      success.play();
      
      import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
        (module) => {
          setTimeout(() => {
            this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
          }, 0);
        }
      );
    } else {
      //A player was not gives a name
      error.play();
      this.errorText = "ERROR 01: A PLAYER HAS NOT BEEN FILLED OUT!";
    }

   
  }
  
  //Adds a new player at the end of the list
  add(e) {

    this.noWalk();

    const click = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/coin.mp3');
    click.play();

    //Pushes a new item into the list and increments the number of players added
    this.players.push("ENTER");
    this.numChar++;

    //If there are already 3 added players, adding a 4th will increment starting index
    if (this.numChar > 3) {
      this.startIndex = this.players.length - 4;
    }
    this.updateArrowStyles();
    this.clearError();
    this.requestUpdate(); 
  }

  //Removes the player selected from the list
  //WILL BREAK (most times) IF SPAMMED :(
  remove(index) {

    this.noWalk();
    
    //Only deletes a player if there is more than 1
    if (this.numChar > 1) {

      const scream = new Audio('https://www.myinstants.com/media/sounds/toms-screams.mp3');
      scream.play();
  
      this.numChar--;

      //DEATH ANIMATION (what have I done)
      const players = this.shadowRoot.querySelectorAll("rpg-character");
      for (let i = 0; i < players.length; i++) {
          if (i + this.startIndex === index) {
              const player = players[i];
              const animation = player.animate([
                {
                  transform: "scale(1) rotate(0) skew(0)",
                },
                {
                  transform: "scale(4) rotate(.35turn) skew(50deg)",
                },
                {
                  transform: "scale(.25) rotate(-.25turn) skew(10deg)",
                },
                {
                  transform: "scale(6) rotate(-.5turn) skew(30deg)",
                },
                {
                  transform: "scale(4) rotate(.35turn) skew(50deg)",
                },
                {
                  transform: "scale(.25) rotate(-.25turn) skew(10deg)",
                },
                {
                  transform: "scale(6) rotate(-.5turn) skew(30deg)",
                },
                {
                  transform: "scale(1) rotate(0) skew(0)",
                }
              ], {
                duration: 500,
                iterations: 4,
                fill: "forwards",
              });

              animation.onfinish = () => {

                const explode = new Audio('https://www.myinstants.com/media/sounds/minecraft-explode1.mp3');
                explode.play();

                this.players.splice(index, 1); 

                //If the starting index isnt 0, deleting a player will move it down 1
                if (this.startIndex != 0) {
                  this.startIndex--;
                }
                this.updateArrowStyles();
                this.clearError();
                this.requestUpdate();
              };
              break;
          }
      }

    } else {
      //If you try to delete the last player
      const error = new Audio('https://www.myinstants.com/media/sounds/error_CDOxCYm.mp3');
      error.play();
      this.errorText = "ERROR 02: TERMINATION OF THIS PLAYER WILL RESULT IN CATOSTROPHIC CONSEQUENCES!";
    }
  }


  //Saves the player's new name if there are no caps, spaces, special chars, repeat names
  //Otherwise it provides an alert message and sets the name to the default "ENTER"
  saveName(e, index) {
    this.noWalk();
    const error = new Audio('https://www.myinstants.com/media/sounds/error_CDOxCYm.mp3');
    const bading = new Audio('https://cdn.pixabay.com/audio/2022/03/24/audio_2d39932aa9.mp3');

    // Because the name is automatically being updated when anything is typed, this prevents
    // the code thinking the player is already added by temporarily resetting the name
    const newName = e.target.value;
    this.players[index] = "ENTER";

    // Checks if the name chars are correct
    if (/^[a-z0-9]{1,10}$/.test(newName)) {

        // Checks if there is no name repeat
        if (!this.players.includes(newName)) {

            this.players[index] = newName;
            this.clearError();
            bading.play();

        } else {
            // If there is a repeat name
            error.play();
            this.errorText = "ERROR 03: PLAYER HAS ALREADY JOINED THE PARTY!";
            this.players[index] = "ENTER";
        }
    } else {
        // If there are uppercase letters, spaces, or special chars
        error.play();
        this.errorText = "ERROR 04: NAMES CAN ONLY CONTAIN LOWERCASE LETTERS AND NUMBERS!";
        this.players[index] = "ENTER";
    }
    this.requestUpdate();
}


  //Everytime something is typed in a text field it updates the player
  updateName(e, index) {

    this.noWalk();

    //Updates the name so the player skin changes
    const newName = e.target.value;
    this.players[index] = newName;
    if (newName !== "") {
      this.requestUpdate();
    }

    const type = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/click.mp3');
    type.play();

  }

  //Moves the list of viewable players down 1
  moveBack() {
    
    //Moves starting index down 1 to go down the list
    if (this.startIndex > 0) {
      this.startIndex--;
      const click = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/click2.mp3');
      click.play();
      this.updateArrowStyles();
      this.requestUpdate();
    } else {
      //If you can't go back
      const noClick = new Audio('https://cdn.pixabay.com/audio/2022/03/24/audio_35e85ca150.mp3');
      noClick.play();
    }
  }
  
  //Moves the list of viewable players up 1
  moveForward() {

    //Moves the starting index up 1 to go up the list
    if (this.startIndex < this.players.length - 4) {
      this.startIndex++;
      const click = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/click2.mp3');
      click.play();
      this.updateArrowStyles();
      this.requestUpdate();
    } else {
      //If you can't go up
      const noClick = new Audio('https://cdn.pixabay.com/audio/2022/03/24/audio_35e85ca150.mp3');
      noClick.play();
    }
  }

  //Removes animations if something changes (add/remove char, etc)
  noWalk() {
    this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
      player.removeAttribute('walking');
    });
    this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
      player.setAttribute('leg', "");
    });
    this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
      player.setAttribute('hat', "none");
    });
    if (this.successText != "ERROR 404: JOURNEY NOT STARTED") {
      this.successText = "ERROR 404: JOURNEY NOT STARTED";
    }
  }

  //Sets fire to the players
  setAblaze() {
    
    //Sets the player attribute fire to true so that all current players are on fire
    if (!this.ablaze) {
      this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
        player.setAttribute('fire', '');
      });
      //Changes background to be lava
      this.ablaze = !this.ablaze;
      this.style.setProperty('--background-image-url', 
      'url("https://garden.spoonflower.com/c/4646962/p/f/m/KA0PsWp8POkicAAYEycLjIh87elCPS-9Efxw52xViSNDMH2-05QGW-Ag/8-bit%20Lava%20Block%20Design%20Two.jpg")',
      );

      const FIREINTHEHOLE = new Audio('https://www.myinstants.com/media/sounds/fire-in-the-hole-geometry-dash.mp3');
      const buzz = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/hit.mp3');
      FIREINTHEHOLE.play();
      buzz.play();
      this.fireText = "> OH GOD IT BURNS!";

    } else {
      //If players are already on fire the attribute will revert back
      this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
        player.removeAttribute('fire');
      });
      this.ablaze = !this.ablaze;
      this.style.setProperty('--background-image-url', 'url("https://cdn.discordapp.com/attachments/696410557300998244/1223703432381202552/background_thingy.png?ex=661ad1a1&is=66085ca1&hm=0fe027db679bfaf2586b9e5159984e8fc3f043a177e6a57a6fc3a28bd3f0b144&")');
      const waterDrop = new Audio('https://www.myinstants.com/media/sounds/water-drop-plop.mp3');
      waterDrop.play();
      this.fireText = "> FIRE IN THE HOLE!";
    }
  }

  //Updates arrows when they are clickable
  updateArrowStyles() {

    if (this.startIndex > 0) {
      this.backArrowBool = true;
    } else {
      this.backArrowBool = false;
    }

    if (this.startIndex < this.players.length - 4) {
      this.forwardArrowBool = true;
    } else {
      this.forwardArrowBool = false;
    }

    this.requestUpdate();
  }

  clearError() {
    if (this.errorText != "ERROR 00: SAFE FROM ERRORS") {
      this.errorText = "ERROR 00: SAFE FROM ERRORS";
    }
  }
  
  //Ignore this it's a secret (seriously)
  secret() {
    //Don't worry about this part, it's secret
    const secretaudio = new Audio("https://www.myinstants.com/media/sounds/epic.mp3");
    secretaudio.play();
  }

  render() {

    //Only shows a max of 4 players at a time (for screen fitting purposes)
    const visPlayers = this.players.slice(this.startIndex, this.startIndex + 4);

    return html`
      <div class="project1">
        <div class="title">${this.title}</div>
        <div class="uibg">
          <confetti-container id="confetti">
            <div class="bgspacing">
              <div class="charlist">

              <!-- Back arrow that only appears if there are players with a low index that are hidden -->
                <button @click="${this.moveBack}" class="backarrow"><</button>

                <!-- Creates a map from the player list so that each player is displayed with the same design -->
                ${visPlayers.map((player, index) => html`
                  <div class="chars">
                    <div class="character-wrapper">
                      <rpg-character seed="${player}"></rpg-character>
                    </div>

                    <!-- Allows you to enter in any player's name with realtime changes to the player -->
                    <input type="text" class="nametf" .value="${player || "ENTER"}"  @input="${(e) => this.updateName(e, index + this.startIndex)}" @change="${(e) => this.saveName(e, index + this.startIndex)}">
                    
                    <div class="nameline"></div>
                    <div class="btnwrapper">

                    <!-- Save and delete button only appear on players who aren't you (first index) -->
                      ${index + this.startIndex > 0 ? html`
                        <button @click="${() => this.remove(index + this.startIndex)}" class="removebtn">> REMOVE</button>
                      ` : ''}


                    </div>
                  </div>
                `)}

                <!-- The add button to add new players -->
                <button @click="${this.add}" class="addbtn">
                  <div class="addsymbl">+</div>
                  <div class="numchar">${this.numChar} <br> Added</div>
                </button>

                <!-- Forward arrow that only appears if there are players with a high index that are hidden -->
                <button @click="${this.moveForward}" class="forwardarrow">></button>

              </div>

              <!-- Save button that runs the confetti -->
              <div class="bottombtnwrap">
                <button @click="${this.setAblaze}" class="firebtn">${this.fireText}</button>
                <button @click="${this.makeItRain}" class="finishbtn">> START JOURNEY</button>
              </div>
            </div>
          </confetti-container>
        </div>
        <div class="errorText">
          <type-writer delay="100" text="${this.errorText}" erase-speed="15" speed="50"></type-writer>
        </div>
        <div class="successText">
          <type-writer delay="100" text="${this.successText}" erase-speed="15" speed="50"></type-writer>
        </div>
      </div>

      <!-- a super secrety secret (its a secret) -->
      <button @click="${this.secret}" class="secret">?</button>
    `;
  }
  
  static get properties() {
    return {
        players: { type: Array, reflect: true },
        numChar: { type: Number, reflect: true},
        startIndex: { type: Number, reflect: true},
        walkingBool: { type: Boolean, reflect: true},
        ablaze: { type: Boolean, reflect: true},
        backArrowBool: { type: Boolean, reflect: true},
        forwardArrowBool: { type: Boolean, reflect: true},
        fireText: { type: String, reflect: true},
        successText: { type: String, reflect: true},
        errorText: { type: String, reflect: true},
        title: { type: String, reflect: true},
    };
  }
}

globalThis.customElements.define(PartyUI.tag, PartyUI);