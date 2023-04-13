/* eslint-disable class-methods-use-this */

export class DialogModal extends HTMLElement {
  close () {
    // @ts-expect-error
    openModal?.(undefined);
  }
}

customElements.define('dialog-modal', DialogModal);
