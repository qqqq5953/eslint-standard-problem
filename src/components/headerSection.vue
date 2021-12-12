<template>
  <header class="header">
    <nav class="nav">
      <h1>
        <a href="#" class="logo">
          <i class="fab fa-4x fa-google"></i>
          <span class="websiteName">TaiFun旅遊網</span>
        </a>
      </h1>
    </nav>

    <section class="banner">
      <h2 class="banner_title">尋找台灣</h2>
      <h3 class="banner_subtitle">景點、活動、美食</h3>
      <div class="banner_search">
        <div class="banner_searchBar">
          <input
            type="text"
            placeholder="請輸入關鍵字"
            v-model.trim="search"
            @keyup.enter="searchBtn"
          />
          <i class="fas fa-lg fa-search"></i>
        </div>
        <button
          type="button"
          class="banner_filterBtn"
          @click="changeMaskStatus"
        >
          <div class="banner_filterIcon">
            <i class="fas fa-bars"></i>
          </div>
          <span class="banner_filterText">篩選</span>
        </button>
      </div>
      <input
        type="button"
        class="banner_searchBtn"
        @click="searchBtn"
        value="搜尋"
      />
      <FilterSection
        :get-mask="hasMask"
        @close-mask="changeMaskStatus"
      ></FilterSection>
    </section>
  </header>
</template>

<script>
export default {
  props: ['place', 'food', 'event'],
  data() {
    return {
      hasMask: false,
      temp: '',
      search: '',
      allPlaceData: [],
      allFoodData: [],
      allEventData: [],
      allData: []
    };
  },
  methods: {
    searchBtn() {
      if (this.search === '') return;

      console.log('this.allData', this.allData);
      const searchData = this.allData.filter((data) => {
        return data.Name.match(this.search);
      });

      this.emitter.emit('searchData', searchData);
      this.emitter.emit('searchStatus', false);

      this.search = '';
    },
    changeMaskStatus() {
      this.hasMask = !this.hasMask;
      this.emitter.emit('activate-loading', this.hasMask);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/header.scss';
</style>
