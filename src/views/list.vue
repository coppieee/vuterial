<template>
  <div>
    <mdc-headline2>list</mdc-headline2>

    <mdc-subtitle1>Single line</mdc-subtitle1>
    <mdc-list>
      <mdc-list-item>List item</mdc-list-item>
      <mdc-list-item>List item</mdc-list-item>
      <mdc-list-item>List item</mdc-list-item>
    </mdc-list>

    <mdc-subtitle1>two line</mdc-subtitle1>
    <mdc-list :two-line="true">
      <mdc-list-item>
        <template v-slot:primary>List item</template>
        <template v-slot:secondary>secondary</template>
      </mdc-list-item>
      <mdc-list-item>
        <template v-slot:primary>List item</template>
        <template v-slot:secondary>secondary</template>
      </mdc-list-item>
      <mdc-list-item>
        <template v-slot:primary>List item</template>
        <template v-slot:secondary>secondary</template>
      </mdc-list-item>
    </mdc-list>
    <mdc-subtitle1>Leading Icon</mdc-subtitle1>
    <mdc-list>
      <mdc-list-item icon="wifi">List item </mdc-list-item>
      <mdc-list-item icon="bluetooth">List item </mdc-list-item>
      <mdc-list-item icon="data_usage">List item </mdc-list-item>
    </mdc-list>

    <mdc-subtitle1>List with activated item</mdc-subtitle1>
    <mdc-list>
      <mdc-list-item icon="wifi" :selected="true">List item </mdc-list-item>
      <mdc-list-item icon="bluetooth">List item </mdc-list-item>
      <mdc-list-item icon="data_usage">List item </mdc-list-item>
    </mdc-list>

    <mdc-subtitle1>Trailing Icon</mdc-subtitle1>
    <mdc-list>
      <mdc-list-item icon="wifi" :selected="true">List item
        <template #meta>
          <i class="material-icons">info</i>
        </template>
      </mdc-list-item>
      <mdc-list-item icon="bluetooth">List item
        <template #meta>
          <i class="material-icons">info</i>
        </template>
      </mdc-list-item>
      <mdc-list-item icon="data_usage">List item
        <template #meta>
          <i class="material-icons">info</i>
        </template>
      </mdc-list-item>
    </mdc-list>
    
    <mdc-subtitle1>Two-Line with Leading and Trailing Icon and Divider</mdc-subtitle1>
    <mdc-list :two-line="true" :avatar="true">
      <mdc-list-item icon="folder">
        <template v-slot:primary>List item</template>
        <template v-slot:secondary>secondary</template>
        <template #meta>
          <i class="material-icons">info</i>
        </template>
      </mdc-list-item>
      <mdc-list-item icon="folder">
        <template v-slot:primary>List item</template>
        <template v-slot:secondary>secondary</template>
        <template #meta>
          <mdc-icon>info</mdc-icon>
        </template>
      </mdc-list-item>
      <mdc-list-divider/>
      <mdc-list-item icon="folder">
        <template #primary>List item</template>
        <template #secondary>secondary</template>
        <template #meta>
          <mdc-icon>info</mdc-icon>
        </template>
      </mdc-list-item>
      <mdc-list-item icon="folder">
        <template #primary>List item</template>
        <template #secondary>secondary</template>
        <template #meta>
          <mdc-icon>info</mdc-icon>
        </template>
      </mdc-list-item>
    </mdc-list>
  </div>
</template>
