declare module '@material/tab-bar/foundation'{
  import MDCFoundation from 'material__base/foundation';
  import MDCTabBarAdapter from '@material/tab-bar/adapter'
  export default class MDCTabBarFoundation extends MDCFoundation<MDCTabBarAdapter>  {
    /**
     * Activates the tab at the given index.
     * @param index 
     */
    activateTab(index: number): void	
    /**
     * Sets how tabs activate in response to keyboard interaction. Automatic (true) activates as soon as a tab is focused with arrow keys; manual (false) activates only when the user presses space/enter.
    
     * @param useAutomaticActivation 
     */
    setUseAutomaticActivation(useAutomaticActivation: boolean):void
    /**
     * Handles the logic for the "keydown" event.
     * @param evt 
     */
    handleKeyDown(evt: Event):void
    /**
     * Handles the logic for the "MDCTab:interacted" event.
     * @param evt 
     */
    handleTabInteraction(evt: Event):void
    scrollIntoView(index: number):void
  }
}