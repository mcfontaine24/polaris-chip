import { LitElement, html, css } from 'lit';

class CampusAlert extends LitElement {
  constructor() {
    super();
    this._isOpen = true;
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.toggleButton = this.shadowRoot.querySelector('.toggle-button');
    this.toggleButton.addEventListener('click', this.toggleAlert.bind(this));
    if (this.hasAttribute('sticky')) {
      this.style.position = 'sticky';
      this.style.top = '0';
    }
  }

  static get observedAttributes() {
    return ['status', 'date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const status = this.getAttribute('status');
    const date = this.getAttribute('date');
    const isOpen = this._isOpen ? 'Close' : 'Open';

    this.shadowRoot.innerHTML = `
      <style>
        ${CampusAlert.styles}
      </style>
      <div class="alert ${status}">
        <div class="message">
          <slot></slot>
        </div>
        <div class="date">${date}</div>
        <button class="toggle-button">${isOpen}</button>
      </div>
    `;
  }

  toggleAlert() {
    this._isOpen = !this._isOpen;
    this.render();
    const oppositeButton = this.shadowRoot.querySelector('.toggle-button:not(:focus)');
    oppositeButton.focus();
    this.shadowRoot.querySelector('.whatever').focus();
  }
  

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Arial, sans-serif;
      }
      
      .alert {
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
      }
      
      .notice { background-color: #3498db; color: #fff; }
      .warning { background-color: #f39c12; color: #fff; }
      .alert { background-color: #e74c3c; color: #fff; }
      
      .message { margin-bottom: 5px; }
      .date { font-style: italic; }
      
      .toggle-button { 
        background-color: #3498db; 
        color: #fff; 
        border: none; 
        padding: 5px 10px; 
        cursor: pointer; 
      }
      
      .toggle-button:hover { background-color: #2980b9; }
    `;
  }
}

customElements.define('campus-alert', CampusAlert);
