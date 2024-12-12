import type { ICard } from '~/components/kanban/kanban.types.ts';

export const useDealSliderStore = defineStore('useDealSliderStore', () => {
    const isOpen = ref(false);
    const card = ref<ICard | null>(null);

    const toggleSlider = (event: boolean) => {
        isOpen.value = event;
    };

    const set = (newCard: ICard) => {
        card.value = newCard;
        isOpen.value = true;
    };

    const clear = () => {
        card.value = null;
        isOpen.value = false;
    };

    return {
        isOpen,
        card,
        toggleSlider,
        set,
        clear,
    };
});