<template>
  <h1>{{ id }}</h1>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      // id: this.$route.id
    };
  }
};
</script>
