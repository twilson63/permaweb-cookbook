<template>
  <div class="featured-contributor">
    <div class="top">
      <p class="subtext">Featured Contributor</p>
      <a class="subtext" href="javascript: void(0);">See all contributors</a>
    </div>

    <div class="bottom">
      <div class="avatar"></div>

      <div class="contributor-detail">
        <p class="subtext">atticusofsparta</p>
        <p class="subtext">Expanding the frontier of decentralization</p>
      </div>
    </div>
  </div>
</template>

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
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 50px;
    height: 50px;
    background: black;
    border-radius: 100%;

    margin-right: var(--bs-gutter-x);
  }
}
</style>