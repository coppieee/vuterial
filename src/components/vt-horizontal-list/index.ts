import vtHorizontalList from './vt-horizontal-list.vue'
import vtHorizontalListItem from './vt-horizontal-list-item.vue'
export const vtHorizontalListComponents = {
  vtHorizontalList,
  vtHorizontalListItem,
}
export interface ScrollState{
  type:''|'init-index'|'update-move-rate'|'update-index'
  from:''|'horizontal-list'|'tab-bar'
  index:number
  moveRate:number
}