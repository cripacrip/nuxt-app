<script setup lang="ts">
import { useAuthStore, useIsLoadingStore } from '@/store';
import { account } from '@/utils/appwrite'

const authStore = useAuthStore()
const isLoadingStore = useIsLoadingStore()
const router = useRouter()

const logout = async () => {
    isLoadingStore.set(true)
    await account.deleteSession('current')
    authStore.clear()
    await router.push('/login')
    isLoadingStore.set(false)
}
 
</script>

<template>
    <div>
        <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
            <NuxtLink class="mb-10 block" to="/">
                <NuxtImg
                    src="/logo2.png"
                    alt="img"
                    width="100px"
                    class="mx-auto"
                />
            </NuxtLink>
            <button 
                class="absolute top-2 right-3 transition-colors hover:text-purple-400"
                @click="logout"
            >
                <!-- ICON -->
                 <Icon name="line-md:logout" size="22"></Icon>
            </button>
            <LayoutMenu />
        </aside>
    </div>
</template>