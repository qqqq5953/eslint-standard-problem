<template>
  <h1>moreresult</h1>
  <PopularSection></PopularSection>
</template>

<script>
import JsSHA from 'jssha';
export default {
  data() {
    return {
      config: { headers: this.GetAuthorizationHeader() },
      placeUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=10&$format=JSON',
      foodUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/Taipei?$top=10&$format=JSON',
      eventUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/Taipei?$top=10&$format=JSON',
      moreResultData: null
    };
  },
  methods: {
    async getPlaceData() {
      try {
        const placeResponse = await this.axios.get(this.placeUrl, this.config);
        this.moreResultData = placeResponse.data;
        console.log('placeData', this.moreResultData);
      } catch (error) {
        console.log(error);
      }
    },
    async getFoodData() {
      try {
        const foodResponse = await this.axios.get(this.foodUrl, this.config);
        this.moreResultData = foodResponse.data;
        console.log('foodData', this.moreResultData);
      } catch (error) {
        console.log(error);
      }
    },
    async getEventData() {
      try {
        const eventResponse = await this.axios.get(this.eventUrl, this.config);
        this.moreResultData = eventResponse.data;
        console.log('eventData', this.moreResultData);
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
    this.getPlaceData();
    this.getFoodData();
    this.getEventData();
  },
  beforeUnmount() {
    this.emitter.on('more-result', (data) => {
      console.log('moreResult接收', data);
    });
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pagination.scss';
</style>
