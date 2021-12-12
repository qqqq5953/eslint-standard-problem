<template>
  <div
    class="mask outline"
    style="
      background-color: rgba(0, 0, 0, 0.5);
      height: 100vh;
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
    "
    v-show="getMask"
  >
    <div class="banner_filterArea">
      <ul class="typeArea" ref="typeArea">
        <li class="popularItem">
          <h4>分類</h4>
          <details class="dropdown" data-id="inner">
            <summary class="dropdown_item_selected">
              {{ this.selectedType.name }}
            </summary>
            <ul class="dropdown_list">
              <template v-for="item in popularType" :key="item.name">
                <li class="dropdown_item" @click="selectPopularType(item)">
                  {{ item.name }}
                </li>
              </template>
            </ul>
          </details>
        </li>
        <a href="#"><i class="fas fa-2x fa-times" @click="closeMask"></i></a>
      </ul>

      <ul
        class="regionArea"
        ref="regionArea"
        @toggle.capture="dropdownListToggle($event)"
      >
        <template v-for="regionItem in regionData" :key="regionItem">
          <li class="region">
            <h4>{{ regionItem.regionName.name }}地區</h4>
            <details class="dropdown" data-id="inner">
              <summary class="dropdown_item_selected">
                {{ regionItem.selectedCity }}
              </summary>
              <ul class="dropdown_list">
                <template v-for="item in regionItem.regionCity" :key="item">
                  <li
                    class="dropdown_item"
                    @click="
                      dropdownItemsSelected($event);
                      selectRegion(item.region, item.city, item.value);
                    "
                  >
                    {{ item.city }}
                  </li>
                </template>
              </ul>
            </details>
          </li>
        </template>
      </ul>

      <input
        type="button"
        class="banner_filterForm_searchBtn"
        @click="closeMask()"
        value="搜尋"
        :disabled="!this.selectedCityValue"
        ref="filterBtn"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['getMask'],
  data() {
    return {
      regionData: [
        {
          regionName: { name: '北部', value: 'north' },
          regionCity: [
            { region: '北部', city: '基隆市', value: 'Keelung' },
            { region: '北部', city: '臺北市', value: 'Taipei' },
            { region: '北部', city: '新北市', value: 'NewTaipei' },
            { region: '北部', city: '桃園市', value: 'Taoyuan' },
            { region: '北部', city: '新竹市', value: 'Hsinchu' },
            { region: '北部', city: '新竹縣', value: 'HsinchuCounty' },
            { region: '北部', city: '宜蘭縣', value: 'YilanCounty' }
          ],
          selectedCity: '' || '選擇縣市'
        },
        {
          regionName: { name: '中部', value: 'middle' },
          regionCity: [
            { region: '中部', city: '苗栗縣', value: 'MiaoliCounty' },
            { region: '中部', city: '臺中市', value: 'Taichung' },
            { region: '中部', city: '彰化縣', value: 'ChanghuaCounty' },
            { region: '中部', city: '南投縣', value: 'NantouCounty' },
            { region: '中部', city: '雲林縣', value: 'YunlinCounty' }
          ],
          selectedCity: '' || '選擇縣市'
        },
        {
          regionName: { name: '南部', value: 'south' },
          regionCity: [
            { region: '南部', city: '嘉義縣', value: 'ChiayiCounty' },
            { region: '南部', city: '嘉義市', value: 'Chiayi' },
            { region: '南部', city: '臺南市', value: 'Tainan' },
            { region: '南部', city: '高雄市', value: 'Kaohsiung' },
            { region: '南部', city: '屏東縣', value: 'PingtungCounty' }
          ],
          selectedCity: '' || '選擇縣市'
        },
        {
          regionName: { name: '東部', value: 'east' },
          regionCity: [
            { region: '東部', city: '花蓮縣', value: 'HualienCounty' },
            { region: '東部', city: '臺東縣', value: 'TaitungCounty' }
          ],
          selectedCity: '' || '選擇縣市'
        },
        {
          regionName: { name: '離島', value: 'island' },
          regionCity: [
            { region: '離島', city: '金門縣', value: 'KinmenCounty' },
            { region: '離島', city: '澎湖縣', value: 'PenghuCounty' },
            { region: '離島', city: '連江縣', value: 'LienchiangCounty' }
          ],
          selectedCity: '' || '選擇縣市'
        }
      ],
      popularType: [
        { name: '熱門景點', value: 'ScenicSpot' },
        { name: '熱門美食', value: 'Restaurant' },
        { name: '近期活動', value: 'Activity' }
      ],
      // popularType: ["熱門景點","熱門美食","近期活動"],
      selectedType: '' || { name: '熱門景點', value: 'ScenicSpot' },
      selectedCityValue: '',
      dropdownsOpen: [],
      regionArea: [],
      dropdownsNoText: [],
      dropdownsHasText: [],
      handler: {
        click: [this.closeMask, this.sendFilterData],
        'keyup.enter': [this.closeMask, this.sendFilterData]
      }
    };
  },
  methods: {
    closeMask() {
      this.$emit('closeMask');
      console.log('closeMask');
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/filter.scss';
</style>
