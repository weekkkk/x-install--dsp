<script setup lang="ts">
import type { UserNicknameFeatureProps } from "./interfaces";
import { UserNickname } from "#components";

const props = defineProps<UserNicknameFeatureProps>();

const { data: user } = useAsyncData(`user-${props.id}`, () => UserApiService.getOne(props.id));
</script>

<template>
  <UserNickname v-if="user" :nickname="user.username" :color="color" />
</template>
