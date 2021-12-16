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
  <!-- {{ test }} -->
</template>

<script>
// import JsSHA from 'jssha';
export default {
  props: ['data'],
  data() {
    return {
      test: [],
      filteredTypeData: '',
      filteredData: ''
    };
  },
  // computed: {
  //   config: { headers: this.GetAuthorizationHeader() },
  //   defaultPlaceUrl:
  //     'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=6&$format=JSON',
  //   defaultFoodUrl:
  //     'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/Taipei?$top=6&$format=JSON',
  //   defaultEventUrl:
  //     'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/Taipei?$top=6&$format=JSON',
  //   placeUrl() {
  //     if (this.filteredData === '') return this.defaultPlaceUrl;
  //     return `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.filteredTypeData}/${this.filteredData}?$top=100&$format=JSON`;
  //   },
  //   foodUrl() {
  //     if (this.filteredData === '') return this.defaultFoodUrl;
  //     return `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.filteredTypeData}/${this.filteredData}?$top=100&$format=JSON`;
  //   },
  //   eventUrl() {
  //     if (this.filteredData === '') return this.defaultEventUrl;
  //     return `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.filteredTypeData}/${this.filteredData}?$top=100&$format=JSON`;
  //   }
  // },
  // methods: {
  //   GetAuthorizationHeader() {
  //     const AppID = '096409078e0c483f87d2ae7551b214ea';
  //     const AppKey = '4s6NU76FhxsKZGCH06RzkVnXoSk';

  //     const GMTString = new Date().toGMTString();
  //     const ShaObj = new JsSHA('SHA-1', 'TEXT');
  //     ShaObj.setHMACKey(AppKey, 'TEXT');
  //     ShaObj.update('x-date: ' + GMTString);
  //     const HMAC = ShaObj.getHMAC('B64');
  //     const Authorization =
  //       'hmac username="' +
  //       AppID +
  //       '", algorithm="hmac-sha1", headers="x-date", signature="' +
  //       HMAC +
  //       '"';
  //     return {
  //       Authorization: Authorization,
  //       'X-Date': GMTString
  //     };
  //   }
  // }
  created() {
    // 接收篩選資料
    this.emitter.on('filteredData', (data) => {
      this.filteredTypeData = data.selectedType;
      console.log('this.filteredTypeData', this.filteredTypeData);

      this.filteredData = data.place;
      console.log('this.filteredData', this.filteredData);
    });
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
