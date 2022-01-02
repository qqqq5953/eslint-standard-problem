<template>
  <section class="card_section">
    <h3 class="card_section_title">
      <span>搜尋結果</span>
      <i class="fas fa-fire"></i>
    </h3>
    <div v-if="searchData" class="card_section_content">
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

<style lang="scss" scoped>
@import '@/assets/scss/popularSection.scss';
// .card_section {
//   padding: 55px 7%;
//   &:nth-of-type(2) {
//     background-color: $color-secondary;
//   }

//   @include pad {
//     padding: 55px 10%;
//   }

//   @include mobile {
//     padding: 30px 50px;
//   }
// }

// .card_section_title {
//   font-weight: bold;
//   font-size: $font-size-xxl;
//   color: $color-primary;
//   margin-bottom: 70px;

//   @include mobile {
//     font-size: $font-size-md;
//     text-align: center;
//     margin-bottom: 30px;
//   }

//   .fas {
//     margin-left: 24px;
//   }
// }

// .card_section_title_icon {
//   margin-left: 23px;
// }

// .card_section_content {
//   display: flex;
//   justify-content: space-between;
//   flex-wrap: wrap;
// }

// .card_section_morePlaceBtn {
//   @include btn-reset;
//   background-color: $color-white-50;
//   color: $color-primary;
//   font-size: $font-size-xl;
//   font-weight: 700;
//   border: 3px solid $color-primary;
//   border-radius: 20px;
//   width: 61%;
//   display: block;
//   margin: 0 auto;

//   @include pad {
//     border-radius: 10px;
//   }

//   @include mobile {
//     font-size: $font-size-sm;
//     width: 85%;
//   }
// }
</style>
