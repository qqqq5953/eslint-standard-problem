<template>
  card detail page

  <l-map
    style="height: 50vh"
    :center="[23.26803970336914, 120.12399291992188]"
    v-model="zoom"
    v-model:zoom="zoom"
  >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-control-layers />

    <l-marker :lat-lng="[23.26803970336914, 120.12399291992188]">
      <l-icon :icon-url="blueIconUrl" />
    </l-marker>
  </l-map>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import {
  LMap,
  LIcon,
  LTileLayer,
  LControlLayers,
  LMarker
  // LPopup
} from '@vue-leaflet/vue-leaflet';
export default {
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LControlLayers,
    LMarker
    // LPopup
  },
  data() {
    return {
      test: null,
      // 地圖資料
      zoom: 14,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      options: {
        closePopupOnClick: false,
        minZoom: 13,
        zoomSnap: 0.5
      },
      greenIconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      redIconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      blueIconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      blueIcon: {},
      redIcon: {},
      greenIcon: {},
      latitude: '',
      longitude: '',
      geoArr: [],
      currentLatitude: '',
      currentLongitude: '',
      defaultMarkerPopup: {},
      mymap: {},
      // 卡片資料
      cardItem: {},
      defaultCardItem: {
        ID: 'C1_315081600H_000138',
        ScenicSpotID: 'C1_315081600H_000138',
        Name: '錢來也雜貨店',
        ScenicSpotName: '錢來也雜貨店',
        DescriptionDetail:
          '錢來也雜貨店興建於西元1952年，為傳統斜瓦平房的老建築。早期做為台鹽鹽工福利社，提供購買日常用品及育樂中心，直到北門鹽場停止鹽業生產工作，福利社也正式劃下句點。西元2003年留法建築師林雅茵，率領一批參加多元就業方案的中高齡失業者，展開化腐朽為神奇的改造行動，重新賦予錢來也雜貨店新時代意義，經過閒置空間改造，十分具當地特色風情。 「錢來也」牆壁外觀是利用當地廢棄瓦片、貝殼、蚵殼鋪至而成，屋前掛著金元寶的招牌，象徵生意興隆、財源滾滾。偶像劇「王子變青蛙」更特別在此拍攝，經電視劇播出後，吸引許多遊客前來拍照留影。',
        Description:
          '錢來也雜貨店興建於西元1952年，為傳統斜瓦平房的老建築。早期做為台鹽鹽工福利社，提供購買日常用品及育樂中心，直到北門鹽場停止鹽業生產工作，福利社也正式劃下句點。西元2003年留法建築師林雅茵，率領一批參加多元就業方案的中高齡失業者，展開化腐朽為神奇的改造行動，重新賦予錢來也雜貨店新時代意義，經過閒置空間改造，十分具當地特色風情。 「錢來也」牆壁外觀是利用當地廢棄瓦片、貝殼、蚵殼鋪至而成，屋前掛著金元寶的招牌，象徵生意興隆、財源滾滾。偶像劇「王子變青蛙」更特別在此拍攝，經電視劇播出後，吸引許多遊客前來拍照留影。',
        Phone: '886-6-7861515',
        Address: '臺南市727北門區北門區舊埕187號',
        ZipCode: '727',
        OpenTime:
          '星期日08:30–17:30星期一08:30–17:30星期二08:30–17:30星期三08:30–17:30星期四08:30–17:30星期五08:30–17:30星期六08:30–17:30',
        Picture: {
          PictureUrl1: 'https://swcoast-nsa.travel/image/2566/640x480',
          PictureDescription1: '錢來也'
        },
        Position: {
          PositionLon: 120.12399291992188,
          PositionLat: 23.26803970336914,
          GeoHash: 'wsjkm7zd5'
        },
        ParkingPosition: {},
        City: '臺南市',
        SrcUpdateTime: '2021-11-29T01:11:28+08:00',
        UpdateTime: '2021-11-29T01:33:50+08:00'
      },
      cityValue: '',
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
      temp: '',
      foodData: [],
      hotelData: [],
      eventData: [],
      filteredData: [],
      selectedData: {},
      officialSiteData: [],
      filteredDataByDistance: [],
      isCardShown: true,
      noDataWarning: false,
      isTableShown: false
    };
  },
  methods: {
    setMap(latitude, longitude) {
      console.log('傳進來的', latitude, longitude);
    }
  },
  created() {
    console.log('cardDetail created');
    // this.emitter.on('cardDetail', (data) => {
    //   this.test = data;
    //   console.log('cardDetail接收', this.test);
    // });
  },
  mounted() {
    this.latitude = this.defaultCardItem.Position.PositionLat;
    this.longitude = this.defaultCardItem.Position.PositionLon;
    this.setMap(this.latitude, this.longitude);
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/cardDetail.scss';
</style>
