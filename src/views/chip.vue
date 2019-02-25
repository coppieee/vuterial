<template>
  <div>
    <mdc-chip-set>
      <mdc-chip>Chip one</mdc-chip>
      <mdc-chip>Chip two</mdc-chip>
      <mdc-chip>Chip three</mdc-chip>
      <mdc-chip>Chip four</mdc-chip>
    </mdc-chip-set>
    <mdc-subtitle1>choise chips</mdc-subtitle1>
    <mdc-chip-set :choice="true">
      <mdc-chip>Chip one</mdc-chip>
      <mdc-chip>Chip two</mdc-chip>
      <mdc-chip :selected="true">Chip three</mdc-chip>
      <mdc-chip>Chip four</mdc-chip>
    </mdc-chip-set>
    <mdc-subtitle1>filter chips</mdc-subtitle1>
    <mdc-chip-set :filter="true">
      <mdc-chip :checkmark="true">Chip one</mdc-chip>
      <mdc-chip :checkmark="true" :selected="true">Chip two</mdc-chip>
      <mdc-chip :checkmark="true" :selected="true">Chip three</mdc-chip>
      <mdc-chip :checkmark="true">Chip four</mdc-chip>
    </mdc-chip-set>
    <mdc-subtitle1>With leading icon 未実装 TODO:アイコン表示の切り替え</mdc-subtitle1>
    <mdc-chip-set :filter="true">
      <mdc-chip :checkmark="true" leading-icon="face">Chip one</mdc-chip>
      <mdc-chip :checkmark="true" leading-icon="face" :selected="true">Chip two</mdc-chip>
      <mdc-chip :checkmark="true" leading-icon="face" :selected="true">Chip three</mdc-chip>
      <mdc-chip :checkmark="true" leading-icon="face">Chip four</mdc-chip>
    </mdc-chip-set>
    <mdc-subtitle1>Action chips</mdc-subtitle1>
    <mdc-chip-set>
      <mdc-chip leading-icon="event">Add to calender</mdc-chip>
      <mdc-chip leading-icon="bookmark" :selected="true">Bookmark</mdc-chip>
      <mdc-chip leading-icon="alarm" :selected="true">Set alarm</mdc-chip>
      <mdc-chip leading-icon="directions">Get directions</mdc-chip>
    </mdc-chip-set>
    <mdc-subtitle1>Sharpd chips</mdc-subtitle1>
    <mdc-chip-set>
      <mdc-chip class="demo-chip-shaped">Add to calender</mdc-chip>
      <mdc-chip class="demo-chip-shaped">Bookmark</mdc-chip>
      <mdc-chip class="demo-chip-shaped">Set alarm</mdc-chip>
      <mdc-chip class="demo-chip-shaped">Get directions</mdc-chip>
    </mdc-chip-set>
    <mdc-subtitle1>Action chips</mdc-subtitle1>
    <mdc-chip-set>
      <mdc-chip trailing-icon="cancel">Add to calender</mdc-chip>
      <mdc-chip trailing-icon="cancel" :selected="true">Bookmark</mdc-chip>
      <mdc-chip trailing-icon="cancel" :selected="true">Set alarm</mdc-chip>
      <mdc-chip trailing-icon="cancel">Get directions</mdc-chip>
    </mdc-chip-set>
    <mdc-subtitle1>no js</mdc-subtitle1>
    <mdc-chip-set :js="false">
      <mdc-chip>Chip one</mdc-chip>
      <mdc-chip>Chip two</mdc-chip>
      <mdc-chip>Chip three</mdc-chip>
      <mdc-chip>Chip four</mdc-chip>
    </mdc-chip-set>
    
    
  </div>
</template>
<style lang="postcss" scoped>
.demo-chip-shaped{
  border-radius: 4px;
}
</style>

