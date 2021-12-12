<template>
  <section class="card_section">
    <h3 class="card_section_title">
      <span>搜尋結果</span>
      <i class="fas fa-fire"></i>
    </h3>
    <div class="card_section_content">
      <Card v-for="obj in searchData" :key="obj.ID" :item="obj"></Card>
    </div>
    <button type="button" class="card_section_morePlaceBtn">看更多結果</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchData: []
    };
  }
};
</script>

<style lang="scss">
.test {
  color: $color-primary;
}
</style>
