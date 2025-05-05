<script setup lang="ts">
import type { ExportEmits } from "./interfaces";

const emit = defineEmits<ExportEmits>();

const options = [
  {
    value: "export",
    label: "Export",
  },
  {
    value: "pdf",
    label: "PDF",
  },
  {
    value: "excel",
    label: "Excel",
  },
];

function onExport(key: string | undefined) {
  switch (key) {
    case "pdf":
      emit("pdf");
      break;
    case "excel":
      emit("excel");
      break;
  }
}
</script>

<template>
  <UiButtonSelect model-value="export" selected-color="primary" :options="options" @update:model-value="onExport" />
</template>
