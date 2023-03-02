<template>
  <div v-if="contributors.length > 0" class="featured-contributor">
    <div class="top">
      <p class="subtext">Featured Contributor</p>
      <a class="subtext" href="javascript: void(0);">See all contributors</a>
    </div>

    <div class="bottom">
      <div v-for="contributor in contributors" class="contributor" :style="{'transform': `translatex(${-(current * 100)}%)`}">
        <div class="avatar" :style="{'background-image': `url('${contributor.avatar_url}')`}"></div>
        <div class="contributor-detail">
          <p class="subtext">{{ contributor.login }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      contributors: [],
    };
  },
  methods: {
    nextContributor() {
      if (this.current + 1 >= this.contributors.length) {
        this.current = 0;
      } else {
        this.current++;
      }
    }
  },
  mounted() {
    fetch("https://api.github.com/repos/twilson63/permaweb-cookbook/contributors?q=contributions&order=desc")
      .then(res => res.json())
      .then(result => {
        this.contributors = result;

        setInterval(this.nextContributor, 3000);
      })
  }
}
</script>

<style lang="scss">
.featured-contributor {
  p, a {
    opacity: 0.5;
  }

  .top {
    display: flex;
    justify-content: space-between;

    margin-bottom: 20px;
  }

  .bottom {
    overflow: hidden;
    white-space: nowrap;
  }

  .contributor {
    font-size: 0;
    width: 100%;

    display: inline-flex;
    align-items: center;

    transition: transform .3s;
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