<script setup lang="ts">
import { useAuthStore, useIsLoadingStore } from "@/store"
import { v4 as uuid } from "uuid";
useHead({
    title: 'Login | CRM System'
})

const emailRef = ref('') 
const passwordRef = ref('')
const nameRef = ref('')

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const route = useRouter()

const login = async() => {
    isLoadingStore.set(true)
    await account.createEmailPasswordSession(emailRef.value, passwordRef.value)
    const response = await account.get()
    if (response) {
        authStore.set({
            email: response.email,
            name: response.name,
            status: response.status
        })
    }

    emailRef.value = '';
    passwordRef.value = '';
    nameRef.value = '';

    await route.push('/')
    isLoadingStore.set(false)
}

const register = async () => {
    await account.create(uuid(), emailRef.value, passwordRef.value)
    await login()
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen w-full">
        <div class="rounded bg-sidebar w-1/4 p-5">
            <h1 class="text-2xl font-bold text-center mb-5">Login</h1>
            <form>
                <UiInput 
                    v-model="emailRef"
                    placeholder="Email" 
                    type="email"
                    class="mb-3"
                />
                <UiInput 
                    v-model="passwordRef"
                    placeholder="Password" 
                    type="password"
                    class="mb-3"
                />
                <UiInput 
                    v-model="nameRef"
                    placeholder="Name" 
                    type="name"
                    class="mb-3"
                />
                <div class="flex items-center justify-center gap-5">
                    <UiButton @click="login" type="button">Login</UiButton>
                    <UiButton @click="register" type="button">Register</UiButton>
                </div>
            </form>
        </div>
    </div>
</template>