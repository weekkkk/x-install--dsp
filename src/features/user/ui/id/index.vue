<script setup lang="ts">
import type { UserIdFeatureProps } from "./interfaces";

const props = defineProps<UserIdFeatureProps>();

const { data: user } = useAsyncData(`user-${props.id}`, () => UserApiService.getOne(props.id));
</script>

<template>
  <UserId v-if="user" :id="user.id" />
</template>
