<script setup lang="ts">
import dayjs from "dayjs";
import { useDealSliderStore } from "@/store/deal-slide.store";

const dealsStore = useDealSliderStore();
</script>

<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="uppercase bold text-xl bg-4">About a deal</div>
    <KanbanSlideoverLabel label-text="Name">
      <h2>
        {{ dealsStore.card?.name }}
      </h2>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Price">
      {{ convertCurrency(dealsStore.card?.price || 0) }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Status">
        <UiBadge variant="outline">
            {{ dealsStore.card?.status }}
        </UiBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Client">
      {{ dealsStore.card?.companyName }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Date">
      {{ dayjs(dealsStore.card?.$createdAt).format('DD MMMM YYYY') }}
    </KanbanSlideoverLabel>
  </div>
</template>
