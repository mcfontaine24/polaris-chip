import { LitElement, html, css } from 'lit';

export class AlertMessage extends LitElement {

  static get tag() {
    return 'alert-message';
  } 

  constructor() {
    super();
    this.sticky = false;
    this.opened = true;
    this.status = "notice";
    this.date = 'Current Date';
    this.message = 'We are experiencing technical difficulties :)';

    const storedStatus = localStorage.getItem('alertStatus');
    if (storedStatus === 'closed') {
      this.opened = false;
      this.style.setProperty('--height', '60px');
    }  
  }


  static get styles() {
    return css`
      :host([sticky]) {
        position: sticky;
        top: 0;
      }

      :host([open]) .banner_wrapper {
        max-height: var(--height);
      }

      :host([status="notice"]) .design {
        background-color: var(--notice-bg, var(--bg, #dc0a0a));
      }

      :host([status="warning"]) .design {
        background-color: var(--warning-bg, var(--bg, #1dbd53));
      }

      :host([status="alert"]) .design {
        background-color: var(--alert-bg, var(--bg, #0963ea));
      }

      .closed .banner_wrapper {
        height: var(--closed-height, var(--height, 60px));
      }

      .banner_wrapper {
        background-color: lightseagreen;
        height: var(--height, 100px);
        transition: all 0.2s ease;
        overflow: hidden;
      }

      .banner {
        padding: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: skew(20deg);

        flex-direction: column;
      }

      .banner-heading {
        text-align: center;
        color: white;
        flex: 1;
        
      }
      
      .banner-opened-text {
        text-align: center;
        color: white;
        transform: skew(20deg);
        margin-top: 10px;
      }
      
      .toggle-button {
        padding: 5px;
        border: 2px solid black;
        background: red;
        color: #fff;  
        font-size: 14px;
        margin-top: 10px;
      }

      .design {
        width: 98%;
        height: 100%;
        background-color: var(--bg);
        transform-origin: bottom right; 
        transform: skew(-20deg);
        
      }

    `;
  }

  sizeBanner() {
    this.opened = !this.opened;
  
    if (!this.opened) {
      this.style.setProperty('--height', '60px');
      localStorage.setItem('alertStatus', 'closed');
    } else {
      this.style.removeProperty('--height');
      localStorage.removeItem('alertStatus');
    }

    this.requestUpdate();
  }  

  render() {
    return html`   
      <div class="banner_wrapper">
        <div class="design">
          <div class="banner">
            <div class="banner-heading">
              <strong>PSU Alert Message</strong> || <strong>Date:</strong> ${this.date}
            </div>
            <button class="toggle-button" @click="${this.sizeBanner}">
              ${this.opened ? 'Close' : 'Open'} Alert
            </button>
          </div>
          <div class="banner-opened-text">
            ${this.opened ? html`
              <div class="message">${this.message}</div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }
  

  static get properties() {
    return {
      sticky: { type: Boolean, reflect: true},
      open: { type: Boolean, reflect: true },
      status: { type: String },
      date: { type: String },
      message: { type: String },
    };
  }
}

globalThis.customElements.define(AlertMessage.tag, AlertMessage);
