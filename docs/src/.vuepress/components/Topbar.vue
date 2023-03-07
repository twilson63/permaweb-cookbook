<template>
  <div class="topbar">
    <p>12pm ET / 5pm GMT every week on Wednesdays <a target="_blank" class="action" href="https://calendar.google.com/calendar/u/0?cid=Y182Nzk0ZDU3ZWRjNTM1NGIwN2IzZjllZWQ0MmY3NGZkMzc5M2EwNmU0OGExOWZjMmYzNzQ3MzViZjdlNWRlZGFiQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20">Add to Google Calendar</a></p>
  </div>
</template>

<style lang="scss">
.topbar {
  background: var(--c-topbar-bg);
  text-align: center;
  padding: 15px 0;

  p {
    line-height: 1.35rem;
    margin: 0;

    .action {
      text-decoration: underline;
      margin-left: 15px;
    }
  }
}
</style>