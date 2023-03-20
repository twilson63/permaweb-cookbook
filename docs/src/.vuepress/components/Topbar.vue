<template>
  <div class="topbar">
    <p>
      Cookbook Community Meetup - 12pm ET / 5pm GMT every week on Wednesdays
      <a
        target="_blank"
        class="action"
        href="https://calendar.google.com/calendar/u/0/r/eventedit?dates=20230308T120000/20230308T130000&ctz=America/New_York&text=Permaweb+Cookbook+Meetup&location=https://app.gather.town/app/VQzhQa280FhWKtuy/permaweb?spawnToken%3Dd8Vy968fQ4eZ1Y44vxFg&uid=23d7fc37-46bd-45d5-b718-6b41d237ea57"
        >Add to Google Calendar</a
      >
    </p>
  </div>
</template>

<style lang="scss">
.topbar {
  position: relative;
  z-index: 12;
  background: var(--c-topbar-bg);
  text-align: center;
  padding: 15px;

  p {
    line-height: 1.35rem;
    margin: 0;

    .action {
      white-space: nowrap;
      text-decoration: underline;
      margin-left: 15px;
    }
  }
}
</style>
