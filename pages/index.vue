<script setup lang="ts">
import type { ICard, IColumn } from "@/components/kanban/kanban.types";
import { useKanbanQuery } from "~/components/kanban/useKanbanQuery";
import { convertCurrency } from "@/utils/convert.currency";
import { EnumStatus } from "~/types/deals.types";
import { useMutation } from '@tanstack/vue-query';
import { COLLECTION_DEALS, DB_ID } from '@/utils/app.const';
import dayjs from "dayjs";
import { generateColumnStyle } from "~/components/kanban/generate-gradient";
import { useDealSliderStore } from "@/store"

useHead({
  title: "Home | CRM System",
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
const dealStore = useDealSliderStore()

type TypeMutationVariables = {
    docId: string,
    status?: EnumStatus,
}

const { mutate } = useMutation({
    mutationKey: ['move card'],
    mutationFn: ({ docId, status }: TypeMutationVariables) =>
    DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
        status,
    }),
    onSuccess: () => {
        refetch()
    }
})

const handleDragStart = (card: ICard, column: IColumn) => {
    dragCardRef.value = card
    sourceColumnRef.value = column
}

const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
}

const handleDrop = (targetColumn: IColumn) => {
    if (dragCardRef.value && sourceColumnRef.value) {
        mutate({docId: dragCardRef.value.id, status: targetColumn.id})
    }
}

</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System by WakaWaka</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div 
            v-for="(column, index) in data"
            :key="column.id"
            class="min-height-screen"
            @dragover="handleDragOver"
            @drop="() => handleDrop(column)"
        >
          <div 
            class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
            :style="generateColumnStyle(index, data?.length ?? 1)" 
        >
            {{ column.name }}
          </div>
          <KanbanCreateDeal :refetch="refetch" :status="column.id" />
          <div>
            <UiCard
                v-for="card in column.items"
                :key="card.id"
                class="mb-5 mt-2"
                draggable="true"
                @dragstart="() => handleDragStart(card, column)"
            >
                <UiCardHeader role="button" @click="dealStore.set(card)">
                    <UiCardTitle>{{ card.name }}</UiCardTitle>
                    <UiCardDescription>{{ }}</UiCardDescription>
                    <UiCardDescription class="mt-2 block">{{ convertCurrency(card.price) }}</UiCardDescription>
                </UiCardHeader>
                <UiCardContent class="text-xs">
                    <div>Company</div> 
                    {{ card.companyName }}
                </UiCardContent>
                <UiCardFooter>
                    {{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}
                </UiCardFooter>
            </UiCard>
          </div>
        </div>
      </div>
      <KanbanSlideover />
    </div>
  </div>
</template>
