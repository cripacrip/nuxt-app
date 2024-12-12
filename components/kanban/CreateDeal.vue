<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { v4 as uuid } from 'uuid';
import { defineProps, withDefaults } from 'vue';
import { COLLECTION_DEALS, DB_ID } from '@/utils/app.const';
import type { IDeal } from '~/types/deals.types';

const isOpenForm = ref<boolean>(false);

interface IDealFromState extends Pick<IDeal, 'name' | 'price'>
{
    customer: {
        email: string;
        name: string;
    }
    status: string;
}

const props = withDefaults(defineProps<{
    status: string;
    refetch: () => void;
}>(), {
    status: '',
})

const {handleSubmit, defineField, handleReset} = useForm<IDealFromState>({
    initialValues: {
        status: props.status,
    }
})

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [customerEmail, customerEmailAttrs] = defineField('customer.email')
const [customerName, customerNameAttrs] = defineField('customer.name')

const {mutate, isPending} = useMutation({
    mutationKey: ['create a new deal'],
    mutationFn: (data: IDealFromState) => DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
    onSuccess(data) {
        props.refetch && props.refetch()
        handleReset()
    }
})

const onSubmit = handleSubmit(values => {
    mutate(values)
})

</script>

<template>
    <div class="text-center mb-2">
        <button
            class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]"
            @click="isOpenForm = !isOpenForm"
        >
            <Icon 
                v-if="isOpenForm"
                name="line-md:arrow-up"
                class="fade-in-100 fade-out-0"
                size="35"
            />
            
            <Icon 
                v-else
                name="line-md:plus-circle"
                class="fade-in-100 fade-out-0"
                size="35"
            />
        </button>
    </div>
    <form v-if="isOpenForm" @submit="onSubmit" class="form">
        <UiInput
            placeholder="Name"
            v-model="name"
            v-bind="nameAttrs"
            type="text"
            class="input"
        />

        <UiInput
            placeholder="Price"
            v-model="price"
            v-bind="priceAttrs"
            type="number"
            class="input"
        />

        <UiInput
            placeholder="Email"
            v-model="customerEmail"
            v-bind="customerEmailAttrs"
            type="text"
            class="input"
        />

        <UiInput
            placeholder="Company"
            v-model="customerName"
            v-bind="customerNameAttrs"
            type="text"
            class="input"
        />

        <button class="btn" :disabled="isPending">
            {{ isPending ? "Loading..." : "Add" }}
        </button>

    </form>
</template>

<style scoped>
.input {
    @apply border-[#161c26] mb-2 placeholder:text-[#748092]
    focus:border-border transition-colors;
}

.btn {
    @apply text-xs border py-1 px-2 rounded border-[#161c26] hover:border-[#482c65]
    transition-colors text-[#aebed5] hover:text-white
}

.form {
    @apply mb-3 block;
    animation: show 0.3s ease-in-out;
}

@keyframe show {
    from {
        @apply border-[#a252c83d];
        transform: translateY(-35px);
        opacity: 0.4
    }

    90% {
        @apply border-[#a252c83d]
    }

    to {
        @apply border-transparent;
        transform: translateY(0);
        opacity: 1;
    }
}
</style>