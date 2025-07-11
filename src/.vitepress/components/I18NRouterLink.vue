<script setup>
import { ref, watch } from "vue";
import { useRoute } from 'vitepress'
import { getCurrentLanguage, getLanguagePath } from '../composables/useI18N';

const { to } = defineProps({
  to: String
});

const route = useRoute();
const updatedTo = ref(to);

watch(() => route.path, (path) => {
  if (!to) return;

  updatedTo.value = getLanguagePath(to, getCurrentLanguage(path));
}, { immediate: true });
</script>

<template>
  <RouterLink v-bind="$attrs" :to="updatedTo">
    <slot></slot>
  </RouterLink>
</template>