declare module '@material/tab-indicator'{
export interface MDCTabIndicatorAdapter {
  /**
   * Adds the given className to the root element.
   * @param className The className to add
   */
  addClass(className: string): void;

  /**
   * Removes the given className from the root element.
   * @param className The className to remove
   */
  removeClass(className: string): void;

  /**
   * Returns the client rect of the content element.
   */
  computeContentClientRect(): ClientRect;

  /**
   * Sets a style property of the content element to the passed value
   * @param propName The style property name to set
   * @param value The style property value
   */
  setContentStyleProperty(propName: string, value: string): void;
}
}