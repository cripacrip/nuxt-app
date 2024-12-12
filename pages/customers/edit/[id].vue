<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query';
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '@/utils/app.const';
import { v4 as uuid } from 'uuid';
import type { ICustomer } from '~/types/deals.types';

interface ICustomerFromState
    extends Pick<ICustomer, 'avatar_url' | 'email' | 'name' | 'from_source'> {}

interface InputFileEvent extends Event {
    target: HTMLInputElement
}

useHead({
    title: 'Edit company'
})

const router = useRoute()
const customerId = router.params.id as string

const { handleSubmit, defineField, setFieldValue, setValues, values } = useForm<ICustomerFromState>()

const { data, isSuccess } = useQuery({
    queryKey: ['get customer', customerId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId),
})

watch(isSuccess, () => {
    const initialData = data.value as unknown as ICustomerFromState
    setValues({
        email: initialData.email,
        avatar_url: initialData.avatar_url,
        from_source: initialData.from_source || '',
        name: initialData.name,
    })
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [fromSource, fromSourceAttrs] = defineField('from_source')

const {mutate, isPending} = useMutation({
    mutationKey: ['update customers', customerId],
    mutationFn: (data: ICustomerFromState) => DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data)
})

const { mutate: uploadAvatar, isPending: isUploadAvatarPending, isError, } = useMutation({
    mutationKey: ['upload image'],
    mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
    onSuccess(data) {
        const response = storage.getFileDownload(STORAGE_ID, data.$id)
        // setFieldValue('avatar_url', response.href)
    }
})

// :onchange="(e:InputFileEvent) => e?.target?.files?.length && uploadAvatar(e.target.files[0])"

const changeFile = (e:InputFileEvent) => {
    if (e.target.files?.length) {
        console.log(isError)
        uploadAvatar(e.target?.files[0])
    }
}



const onSubmit = handleSubmit(values => {
    mutate(values)
})

</script>

<template>
    <div class="p-10">
        <h1 class="font-bold">
            Editing {{ (data as unknown as ICustomerFromState)?.name }}
        </h1>

        <form @submit="onSubmit" class="form">
            <UiInput
                placeholder="Name"
                v-model="name"
                v-bind="nameAttrs"
                type="text"
                class="input"
            />

            <UiInput
                placeholder="Email"
                v-model="email"
                v-bind="emailAttrs"
                type="text"
                class="input"
            />

            <UiInput
                placeholder="From"
                v-model="fromSource"
                v-bind="fromSourceAttrs"
                type="text"
                class="input"
            />

            <img
                v-if="values.avatar_url || isUploadAvatarPending"
                :src="values.avatar_url"
                alt="image"
                width="50"
                height="50"
                class="rounded-full my-2"
            >

            <div class="grid w-full max-w-sm items-center gab-1.5 input">
                <label>
                    <div class="text-sm mb-2">Logo</div>
                    <UiInput
                        type="file"
                        :onchange="changeFile"
                        :disabled="isUploadAvatarPending"
                    />
                </label>
            </div>

            <UiButton :disabled="isPending" variant="secondary" class="mt-3">
                {{ isPending ? 'Loading...' : 'Save' }}
            </UiButton>
        </form>
    </div>
</template>

<style source>
.input {
    @apply border-[#161c26] mb-2 placeholder:text-[#748092]
    focus:border-border transition-colors;
}
</style>
