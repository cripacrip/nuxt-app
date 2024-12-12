<script setup lang="ts">
import { useDealSliderStore } from "~/store/deal-slide.store";
import dayjs from "dayjs";
import { useComments } from "./useComments";
import { useCreateComment } from "./useCommentCreate";
import type { IDeal } from "~/types/deals.types";

const { data, refetch, isLoading } = useComments();
const { commentRef, writeComment } = useCreateComment({ refetch });

const card = data as unknown as IDeal;

const store = useDealSliderStore();
</script>

<template>
  <UiInput
    placeholder="Enter the comment"
    v-model="commentRef"
    @keypress.enter="writeComment"
  />

  <UiSkeleton v-if="isLoading" class="w-full h-p[76px] rounded mt-5" />
  <div v-else-if="card">
    <div
        v-for="comment in card?.comments"
        :key="comment.$id"
        class="flex items-start mt-5"
    >
        <Icon name="line-md:chat-bubble" class="mt-3" mt-1 size="25" />
        <div class="border-border bg-black/20 rounded p-3 w-full">
            <div class="mb-2 text-sm">
                Comment {{ dayjs(comment.$createdAt).format('HH:mm') }}
            </div>
            <p>{{ comment.text }}</p>
        </div>
    </div>
  </div>
</template>
