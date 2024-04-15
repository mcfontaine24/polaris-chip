import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class TaggingQ extends DDD {

  static get tag() {
    return 'tagging-q';
  } 

  constructor() {
    super();
    this.question = "What color is the background?"
  }

  static get styles() {

    return css`

      :host {
        display: inline-flex;
      }

      .background {
        background-color: var(--ddd-theme-default-hotPink);
        padding: var(--ddd-spacing-4);
        height: 525px;
        width: 975px;
        display: flex;
        border: var(--ddd-theme-default-lightPink) 20px outset;

        flex-direction: column;
        overflow: hidden;
      }

      .question-heading {
        text-align: left;
        background: transparent;
        border: transparent;
        color: white;
        font-size: 30px;
        font-family: "Press Start 2P", system-ui;
      }

      .input-area {
        text-align: left;
        font-size: 30px;
        font-family: "Press Start 2P", system-ui;
        overflow-wrap: break-word;

        padding: var(--ddd-spacing-2);
        color: var(--ddd-theme-default-opportunityGreen);
        background-color: var(--ddd-theme-default-futureLime);
        border: var(--ddd-theme-default-opportunityGreen) 5px dashed;
      }

    `;
  }

  render() {

    return html`
        <div class="project2">
            <div class="background">
                <div class="question-heading">Question: ${this.question}</div>
                <div class="input-area">Drag and Drop Answer</div>
            </div>
        </div>
    `;
  }

  static get properties() {
    return {
        question: { type: String, reflect: true},
    };
  }
}


globalThis.customElements.define(TaggingQ.tag, TaggingQ);