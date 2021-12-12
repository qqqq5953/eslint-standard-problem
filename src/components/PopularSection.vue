<template>
  <section class="card_section">
    <div class="card_section_title">
      <slot name="card_section_title_text"></slot>
    </div>
    <div class="card_section_content">
      <Card v-for="obj in data" :key="obj.ID" :item="obj"></Card>
    </div>
    <button type="button" class="card_section_morePlaceBtn">
      看更多熱們景點
    </button>
  </section>
</template>

<script>
export default {
  props: ['data']
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/popularSection.scss';
</style>
