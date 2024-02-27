import { LitElement, html, css } from 'lit';

class CounterApp extends LitElement {
  static get properties() {
    return {
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number },
    };
  }

  constructor() {
    super();
    this.counter = 16;
    this.min = 10;
    this.max = 25;
  }

  increment() {
    if (this.counter < this.max) {
      this.counter++;
      this.updateColor();
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
      this.updateColor();
    }
  }

  makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          const confettiContainer = this.shadowRoot.querySelector("#confetti");
          if (confettiContainer) {
            confettiContainer.setAttribute("popped", "");
          } else {
            console.error("Confetti container not found.");
          }
        });
      }
    ).catch((error) => {
      console.error("Failed to import confetti container module:", error);
    });
  }

  updateColor() {
    if (this.counter === 18 || this.counter === 21 || this.counter === this.min || this.counter === this.max) {
      this.style.color = 'red';
    } else {
      this.style.color = ''; 
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 36px; 
         margin-bottom: 16px; 
      }

      .buttons-container {
        display: flex;
      }

      button {
        font-size: 24px; 
        padding: 8px 16px; 
        margin: 8px; 
        cursor: pointer;
        border: none;
        background-color: #fb1fae;
      }

      button:hover {
        background-color: #f05ec9;
      }

      button:focus {
        outline: 2px solid #d679bd; 
      }
    `;
  }

  render() {
    return html`
    
      <div>${this.counter}</div>
      <div class="buttons-container">
      <confetti-container id="confetti">
        <button @click="${this.increment}" ?disabled="${this.counter === this.max}">+</button>
        <button @click="${this.decrement}" ?disabled="${this.counter === this.min}">-</button>
        </confetti-container>
      </div>
      
    `;
  }
}

customElements.define('counter-app', CounterApp);
