<script lang="ts">
import Vue from 'vue'
import mdcButton from '../mdc-button/mdc-button.vue'
export default class MdcCardButton extends mdcButton{
  get cssClass(){
    return { 
      ...super.cssClass,
      'mdc-card__action':true,
      'mdc-card__action--button':true,
    }
  }
}
</script>
