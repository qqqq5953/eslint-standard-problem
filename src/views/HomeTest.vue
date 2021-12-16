<template>
  <div class="wrap">
    <!-- <SearchSection :class="{ 'd-none': searchStatus }"></SearchSection> -->
    <section :class="{ 'd-none': !searchStatus }">
      <router-view :data="placeData"></router-view>
      <!-- <PopularSection :data="placeData">
        <template #card_section_title_text
          >熱門景點<img
            class="card_section_title_icon"
            src="@/assets/place-icon.png"
            alt="place-icon"
        /></template>
      </PopularSection> -->

      <!-- :class="{ 'd-none': place_display }" -->
      <!-- <PopularSection :data="foodData" :class="{ 'd-none': food_display }">
        <template #card_section_title_text
          >熱門美食<img
            class="card_section_title_icon"
            src="@/assets/restaurant-icon.png"
            alt="restaurant-icon"
        /></template>
      </PopularSection> -->

      <!-- <PopularSection :data="eventData" :class="{ 'd-none': event_display }">
        <template #card_section_title_text
          >近期活動<img
            class="card_section_title_icon"
            src="@/assets/event-icon.png"
            alt="event-icon"
        /></template>
      </PopularSection> -->
    </section>
  </div>
</template>

<script>
import JsSHA from 'jssha';

export default {
  data() {
    return {
      config: { headers: this.GetAuthorizationHeader() },
      defaultPlaceUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=6&$format=JSON',
      defaultFoodUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/Taipei?$top=6&$format=JSON',
      defaultEventUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/Taipei?$top=6&$format=JSON',
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
      allData: [],
      filteredData: '',
      filteredTypeData: '',
      // component 呈現狀態
      maskStatus: false,
      searchStatus: true,
      place_display: false,
      food_display: false,
      event_display: false
    };
  },
  computed: {
    placeUrl() {
      if (this.filteredData === '') return this.defaultPlaceUrl;
      return `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.filteredTypeData}/${this.filteredData}?$top=100&$format=JSON`;
    },
    foodUrl() {
      if (this.filteredData === '') return this.defaultFoodUrl;
      return `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.filteredTypeData}/${this.filteredData}?$top=100&$format=JSON`;
    },
    eventUrl() {
      if (this.filteredData === '') return this.defaultEventUrl;
      return `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.filteredTypeData}/${this.filteredData}?$top=100&$format=JSON`;
    }
  },
  watch: {
    filteredData() {
      this.place_display = false;
      this.food_display = false;
      this.event_display = false;

      if (this.filteredTypeData === 'ScenicSpot') {
        this.getPlaceData();
        this.food_display = true;
        this.event_display = true;
      }
      if (this.filteredTypeData === 'Restaurant') {
        this.getFoodData();
        this.place_display = true;
        this.event_display = true;
      }
      if (this.filteredTypeData === 'Activity') {
        this.getEventData();
        this.place_display = true;
        this.food_display = true;
      }
    }
  },
  methods: {
    async getPlaceData() {
      try {
        const placeResponse = await this.axios.get(this.placeUrl, this.config);
        this.placeData = placeResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getFoodData() {
      try {
        const foodResponse = await this.axios.get(this.foodUrl, this.config);
        this.foodData = foodResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getEventData() {
      try {
        const eventResponse = await this.axios.get(this.eventUrl, this.config);
        this.eventData = eventResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllData() {
      try {
        const urlArr = [this.placeUrl, this.foodUrl, this.eventUrl];
        const responseArr = [];
        for (let i = 0; i < urlArr.length; i++) {
          const response = await this.axios.get(urlArr[i], this.config);
          responseArr.push(response.data);
        }
        const [placeData, foodData, eventData] = responseArr;
        this.placeData = placeData;
        this.foodData = foodData;
        this.eventData = eventData;
        this.allData = [...placeData, ...foodData, ...eventData];
        console.log('this.placeData', this.placeData);
        console.log('this.foodData', this.foodData);
        console.log('this.eventData', this.eventData);
        console.log('this.allData', this.allData);
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
  created() {
    this.getAllData();

    // 篩選後遮罩控制
    this.emitter.on('activate-loading', (data) => {
      console.log('遮罩是否打開?', data);
      this.maskStatus = data;
    });

    // 接收篩選資料
    this.emitter.on('filteredData', (data) => {
      this.filteredTypeData = data.selectedType;
      console.log('this.filteredTypeData', this.filteredTypeData);

      this.filteredData = data.place;
      console.log('this.filteredData', this.filteredData);
    });

    // 搜尋後區域控制
    this.emitter.on('searchStatus', (data) => {
      this.searchStatus = data;
    });
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  max-width: 1440px;
  margin: 0 auto;
  height: 100vh;
}

.disabled {
  pointer-events: none;
  cursor: none;
}

.d-none {
  display: none !important;
}

.card_section_title_icon {
  margin-left: 23px;
  vertical-align: bottom;
}
</style>
