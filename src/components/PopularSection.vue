<template>
  <section class="card_section">
    <div class="card_section_title">
      <!-- <slot name="card_section_title_text"></slot> -->
      <div>{{ searchTypeData }}</div>
      <img
        v-if="searchTypeData === '熱門景點'"
        src="@/assets/images/place-icon.png"
        alt="place-icon"
      />
      <img
        v-else-if="searchTypeData === '熱門美食'"
        src="@/assets/images/restaurant-icon.png"
        alt="restaurant-icon"
      />
      <img
        v-else-if="searchTypeData === '近期活動'"
        src="@/assets/images/event-icon.png"
        alt="event-icon"
      />
    </div>
    <div class="card_section_content" v-if="paginatedData">
      <Card v-for="obj in paginatedData" :key="obj.ID" :item="obj"></Card>
    </div>
    <router-link
      v-if="searchTypeData && paginatedData.length > 9"
      :to="{ name: 'MoreResult' }"
    >
      <button type="button" class="card_section_morePlaceBtn">
        看更多{{ searchTypeData }}
      </button>
    </router-link>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchTypeData: '',
      paginatedData: null
    };
  },
  created() {
    // 接收分頁資料
    this.emitter.on('paginatedData', (data) => {
      this.paginatedData = data.paginatedData;
      this.searchTypeData = data.searchTypeData;
      console.log(
        'emit on paginatedData ',
        this.paginatedData,
        this.searchTypeData
      );
    });
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/popularSection.scss';
// .card_section {
//   padding: 55px 7.09%;
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
