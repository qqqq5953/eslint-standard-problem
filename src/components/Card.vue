<template>
  <div class="card">
    <div class="card_image">
      <img :src="item.Picture.PictureUrl1" :alt="item.Name" onerror />
      <p
        class="card_description"
        :class="{ 'd-none': !item.DescriptionDetail }"
      >
        {{ item.DescriptionDetail }}
      </p>
      <p class="card_description" :class="{ 'd-none': item.DescriptionDetail }">
        {{ item.Description }}
      </p>
    </div>
    <div class="card_body">
      <div class="card_header">
        <div class="card_header_location">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ item.City }}</span>
        </div>
        <h4 class="card_header_title">{{ item.Name }}</h4>
      </div>
      <div class="card_openTime">
        <h5>開放時間：</h5>
        <div class="card_openTime_details">{{ item.OpenTime }}</div>
      </div>
    </div>
    <button type="button" class="card_moreInfoBtn" @click="toContentPage">
      查看詳情
    </button>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    toContentPage() {
      // 傳送到內容頁
      console.log('click', this.item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/card.scss';
</style>
