<script setup lang="ts">
import { MENU_DATA } from './menu.data';
</script>

<template>
    <div>
        <NuxtLink 
            class="flex items-center py-1 px-3 rounded-lg w-full hover:bg-gray-700 
            hover:shadow hover:rounded-md transition-all mb-2.5 cursor-pointer"
            v-for="item in MENU_DATA"
            :key="item.name"
            :to="item.url"
        >
            <Icon :name="item.icon" class="mr-3" />
            <span>{{ item.name }}</span>
        </NuxtLink> 
    </div>
</template>