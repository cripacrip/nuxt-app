<script setup lang="ts">
import { account } from '@/utils/appwrite';
import { useAuthStore, useIsLoadingStore } from '@/store';

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

onMounted(async() => {
    try {
        const user = await account.get()
        if (user) authStore.set(user)
    } catch (e) {
        router.push('/login')
    } finally {
        isLoadingStore.set(false);
    }
})
</script>

<template>
    <LayoutLoader v-if="isLoadingStore.isLoading" />
    <section v-else :class="{'grid': authStore.isAuth}" style="min-height: 100vh;">
        <LayoutSidebar v-if="authStore.isAuth" />
        <div>
            <slot />
        </div>
    </section>
</template>

<style scoped>
    .grid {
        display: grid;
        grid-template-columns: 1fr 6fr;
    }
</style>