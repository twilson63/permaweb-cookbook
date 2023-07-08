<script setup>
import { useDarkMode } from "@vuepress/theme-default/lib/client/composables/index.js";

import { useI18NStr } from "../composables/useI18N";
import "add-to-calendar-button";

const darkMode = useDarkMode();
const get_i18n_str = useI18NStr();
</script>

<template>
  <div class="topbar">
    <p>
      <span>{{ get_i18n_str("cookbook-meetup-notification") }}</span
      >
      <add-to-calendar-button
        style="white-space: nowrap"
        name="Permaweb Cookbook Community Meetup - 12pm ET / 5pm GMT every week on Wednesdays"
        options="'Apple','Google'"
        location="https://app.gather.town/app/VQzhQa280FhWKtuy/permaweb?spawnToken=d8Vy968fQ4eZ1Y44vxFg"
        startDate="2023-04-26"
        startTime="12:00"
        endTime="13:00"
        timeZone="America/New_York"
        recurrence="weekly"
        buttonStyle="round"
        :lightMode="!darkMode ? 'light' : 'dark'"
        size="1"
      ></add-to-calendar-button>
    </p>
  </div>
</template>

<style lang="scss">
@import "../styles/bootstrap.scss";

.topbar {
  position: relative;
  z-index: 12;
  background: var(--c-topbar-bg);
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
}
</style>
