<script setup>
import { useI18NStr } from "../composables/useI18N";
import "add-to-calendar-button";

const get_i18n_str = useI18NStr();
</script>

<template>
  
  <a href="https://community.arweave.net/#/fullstack" target="_blank">
    <div class="topbar fullstack-hack">
      <p>
        <span>Join the first Arweave Fullstack Hack for up to $50k in funding</span>
      </p>
    </div>
  </a>
  
</template>

<style lang="scss" scoped>
@import "../styles/bootstrap.scss";

a {
  text-decoration: none !important;
  opacity: 1 !important;
}

.topbar {
  position: relative;
  z-index: 12;
  background: var(--c-topbar-bg);
  color: var(--c-text);
  text-align: center;
  padding: 8px;

  @include media-breakpoint-down(md) {
    padding: 3px 10px;
    padding-right: 3px;
  }

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.35rem;
    margin: 0;

    span {
      margin-right: 12px;
      line-height: 1.3;
      text-align: left;

      @include media-breakpoint-down(md) {
        font-size: 10px;
        margin: 0;
      }
    }

    .action {
      color: var(--c-accent-rose);
      white-space: nowrap;
      margin-left: 15px;
    }
  }

  &.fullstack-hack {
    padding: 16px;
    background: #2d53ff;

    @include media-breakpoint-down(md) {
      padding: 10px;
    }

    span {
      color: white;
      font-weight: bold;

      @include media-breakpoint-down(md) {
        font-size: 13px;
      }
    }
  }
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>
