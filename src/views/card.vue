<template>
  <div class="card">
    <mdc-card class="demo-card">
      <template #title>Our Changing Planet</template>
      <template #subtitle>by Kurt Wagner</template>
      <template #body>
        Visit ten places on our planet that are undergoing the biggest changes today.
      </template>
      <template #buttons>
        <mdc-card-button>read</mdc-card-button>
        <mdc-card-button>bookmark</mdc-card-button>
      </template>
      <template #icons>
        <mdc-card-icon>favorite</mdc-card-icon>
        <mdc-card-icon>share</mdc-card-icon>
        <mdc-card-icon>more_vert</mdc-card-icon>
      </template>
    </mdc-card>
    <mdc-card class="demo-card">
      <template #title>Our Changing Planet</template>
      <template #subtitle>by Kurt Wagner</template>
      <template #body>
        Visit ten places on our planet that are undergoing the biggest changes today.
      </template>
    </mdc-card>
    <mdc-card class="demo-card">
      <template #title>Title Only</template>
    </mdc-card>
    <mdc-card class="demo-card">
      <template #body>body only</template>
    </mdc-card>
    <mdc-card class="demo-card" outlined>
      <template #body>outlined card</template>
    </mdc-card>
  </div>
</template>
<style lang="postcss" scoped>
.card{
  padding:1rem;
}
.demo-card{
  width:350px;
  margin-bottom: 1rem;
}
</style>
