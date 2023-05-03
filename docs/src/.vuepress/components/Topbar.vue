<script>
import 'add-to-calendar-button';
</script>
<template>
  <div class="topbar">
    <p>
      <span
        >Cookbook Community Meetup - 12pm ET / 5pm GMT every week on
        Wednesdays</span
      >
      <add-to-calendar-button
        name="Permaweb Cookbook Community Meetup - 12pm ET / 5pm GMT every week on Wednesdays"
        options="'Apple','Google'"
        location="https://app.gather.town/app/VQzhQa280FhWKtuy/permaweb?spawnToken=d8Vy968fQ4eZ1Y44vxFg"
        startDate="2023-04-26"
        startTime="12:00"
        endTime="13:00"
        timeZone="America/New_York"
        recurrence="weekly"
        buttonStyle="round"
        size="1"
      ></add-to-calendar-button>
    </p>
  </div>
</template>

<style lang="scss">
.topbar {
  position: relative;
  z-index: 12;
  background: var(--c-topbar-bg);
  text-align: center;
  padding: 8px;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.35rem;
    margin: 0;

    span {
      margin-right: 8px;
    }

    .action {
      color: var(--c-accent-rose);
      white-space: nowrap;
      margin-left: 15px;
    }
  }
}
</style>
