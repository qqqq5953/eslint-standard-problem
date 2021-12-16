<template>
  篩選結果
  <PopularSection :data="data">
    <template #card_section_title_text
      >熱門景點<img
        class="card_section_title_icon"
        src="@/assets/place-icon.png"
        alt="place-icon"
    /></template>
  </PopularSection>
</template>

<script>
export default {
  props: ['data'],
  datta() {
    return {};
  }
};
</script>
