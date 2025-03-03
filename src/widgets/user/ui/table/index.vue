<script setup lang="ts">
const test: TUser[] = [
  {
    id: "32332",
    dateAdd: "",
    nickname: "test",
    panels: {
      dsp: true,
      "dsp--banner": false,
      "dsp--in-app": false,
    },
  },
  {
    id: "3223",
    dateAdd: "",
    panels: {
      dsp: false,
      "dsp--banner": true,
      "dsp--in-app": false,
    },
  },
];
</script>

<template>
  <UserTable :users="test" />
</template>
