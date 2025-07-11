<script setup>
import { ref, onMounted } from 'vue'
import { useI18NStr } from "../composables/useI18N";

const get_i18n_str = useI18NStr();

const current = ref(0);
const contributors = ref([]);

const nextContributor = () => {
  if (current.value + 1 >= contributors.value.length) {
    current.value = 0;
  } else {
    current.value++;
  }
};

onMounted(() => {
  fetch(
    "https://api.github.com/repos/twilson63/permaweb-cookbook/contributors?q=contributions&order=desc"
  )
    .then((res) => {
      if (res.ok) return res.json();
      else return [];
    })
    .then((result) => {
      contributors.value = result;
      setInterval(nextContributor, 4000);
    });
});
</script>
<template>
  <div v-if="contributors.length > 0" class="featured-contributor">
    <div class="top">
      <p class="subtext">
        {{ get_i18n_str("featured-contributors") }}
      </p>
      <a
        class="subtext"
        target="_blank"
        href="https://github.com/twilson63/permaweb-cookbook/graphs/contributors"
        >{{ get_i18n_str("featured-contributors-action") }}</a
      >
    </div>

    <div class="bottom">
      <div
        class="bottom-inner"
        :style="{ transform: `translateX(${-(current * 100)}%)` }"
      >
        <div v-for="contributor in contributors" class="contributor">
          <div
            class="avatar"
            :style="{ 'background-image': `url('${contributor.avatar_url}')` }"
          ></div>
          <div class="contributor-detail">
            <a target="_blank" :href="contributor.html_url" class="subtext">{{
              contributor.login
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.featured-contributor {
  p,
  a {
    opacity: 0.5;
  }

  .top {
    display: flex;
    justify-content: space-between;

    margin-bottom: 20px;
  }

  .bottom {
    overflow: hidden;
  }

  .bottom-inner {
    font-size: 0px;
    width: 100%;
    white-space: nowrap;
    transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  }

  .contributor {
    padding: 0 4px;
    font-size: 0px;
    width: 100%;

    display: inline-flex;
    align-items: center;
  }

  .avatar {
    width: 50px;
    height: 50px;
    background-position: center;
    background-size: cover;
    border-radius: 100%;

    margin-right: var(--bs-gutter-x);
  }
}
</style>
