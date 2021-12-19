<template>
  <!--熱門景點-->
  <popular-section :data="displayCardData">
    <!-- <template #card_section_title>熱門景點<i class="fas fa-fire"></i></template> -->
  </popular-section>
  <!-- <router-view></router-view> -->
</template>

<script>
import JsSHA from 'jssha';
export default {
  data() {
    return {
      config: { headers: this.GetAuthorizationHeader() },
      defaultPlaceUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=54&$format=JSON',
      // defaultFoodUrl:
      // "https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/Taipei?$top=6&$format=JSON",
      // defaultEventUrl:
      // "https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/Taipei?$top=6&$format=JSON",
      // Data 存放
      cityData: [
        { name: '臺北市', value: 'Taipei' },
        { name: '新北市', value: 'NewTaipei' },
        { name: '桃園市', value: 'Taoyuan' },
        { name: '臺中市', value: 'Taichung' },
        { name: '臺南市', value: 'Tainan' },
        { name: '高雄市', value: 'Kaohsiung' },
        { name: '基隆市', value: 'Keelung' },
        { name: '新竹市', value: 'Hsinchu' },
        { name: '新竹縣', value: 'HsinchuCounty' },
        { name: '苗栗縣', value: 'MiaoliCounty' },
        { name: '彰化縣', value: 'ChanghuaCounty' },
        { name: '南投縣', value: 'NantouCounty' },
        { name: '雲林縣', value: 'YunlinCounty' },
        { name: '嘉義縣', value: 'ChiayiCounty' },
        { name: '嘉義市', value: 'Chiayi' },
        { name: '屏東縣', value: 'PingtungCounty' },
        { name: '宜蘭縣', value: 'YilanCounty' },
        { name: '花蓮縣', value: 'HualienCounty' },
        { name: '臺東縣', value: 'TaitungCounty' },
        { name: '金門縣', value: 'KinmenCounty' },
        { name: '澎湖縣', value: 'PenghuCounty' },
        { name: '連江縣', value: 'LienchiangCounty' }
      ],
      placeData: [],
      foodData: [],
      eventData: [],
      regionData: [],
      filteredPlaceData: '',
      filteredTypeData: '',
      // component 呈現狀態
      maskStatus: false,
      searchStatus: true,
      place_display: false,
      food_display: false,
      event_display: false,
      // 分頁資訊
      currentPage: 1,
      cardPerPage: 9,
      totalPages: ''
    };
  },
  methods: {
    setPageButton() {
      this.totalPages = Math.ceil(this.placeData.length / this.cardPerPage);
      // for (let pageNumber = 1; pageNumber <= this.totalPages; pageNumber++) {
      // this.pageButton.push(pageNumber);
      // }
      // console.log("totalPages", typeof this.totalPages);
      // console.log("pageButton", this.pageButton);
    },
    setPageData(data) {
      const page = this.currentPage;
      const perPage = this.cardPerPage;
      const start = page * perPage - perPage;
      const end = page * perPage;
      // console.log("this.currentPage",this.currentPage);
      return data.slice(start, end);
    },
    onPageChange(page) {
      console.log('pageChange', page);
      this.currentPage = page;
    },
    async getPlaceData() {
      try {
        const placeResponse = await this.axios.get(this.placeUrl, this.config);
        this.placeData = placeResponse.data;
        // console.log("placeData", this.placeData);
        this.totalPages = Math.ceil(this.placeData.length / this.cardPerPage);
      } catch (error) {
        console.log(error);
      }
    },
    GetAuthorizationHeader() {
      const AppID = '096409078e0c483f87d2ae7551b214ea';
      const AppKey = '4s6NU76FhxsKZGCH06RzkVnXoSk';

      const GMTString = new Date().toGMTString();
      const ShaObj = new JsSHA('SHA-1', 'TEXT');
      ShaObj.setHMACKey(AppKey, 'TEXT');
      ShaObj.update('x-date: ' + GMTString);
      const HMAC = ShaObj.getHMAC('B64');
      const Authorization =
        'hmac username="' +
        AppID +
        '", algorithm="hmac-sha1", headers="x-date", signature="' +
        HMAC +
        '"';
      return {
        Authorization: Authorization,
        'X-Date': GMTString
      };
    }
  },
  computed: {
    displayCardData() {
      console.log('displayCardData', this.setPageData(this.placeData));
      return this.setPageData(this.placeData);
    },
    placeUrl() {
      if (this.filteredPlaceData === '') return this.defaultPlaceUrl;
      return `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${this.filteredPlaceData}?$top=54&$format=JSON`;
    }
    // foodUrl() {
    //   if (this.filteredPlaceData === '') return this.defaultFoodUrl;
    //   return `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${this.filteredPlaceData}?$top=6&$format=JSON`;
    // },
    // eventUrl() {
    //   if (this.filteredPlaceData === '') return this.defaultEventUrl;
    //   return `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/${this.filteredPlaceData}?$top=6&$format=JSON`;
    // }
  },
  created() {
    // 打API
    this.getPlaceData();
    // this.getFoodData();
    // this.getEventData();

    // 篩選後遮罩控制
    this.emitter.on('activate-loading', (data) => {
      console.log('遮罩是否打開?', data);
      this.maskStatus = data;
    });

    // 接收篩選資料
    this.emitter.on('filteredData', (data) => {
      this.filteredTypeData = data.selectedType;
      console.log('this.filteredTypeData', this.filteredTypeData);

      this.filteredPlaceData = data.place;
      console.log('this.filteredPlaceData', this.filteredPlaceData);
    });

    // 搜尋後區域控制
    this.emitter.on('searchStatus', (data) => {
      this.searchStatus = data;
    });
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pagination.scss';
</style>
