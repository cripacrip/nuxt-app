import { useQuery } from "@tanstack/vue-query"
import { COLLECTION_DEALS, DB_ID } from "@/utils/app.const"

export const useComments = () => {
    const store = useDealSliderStore()
    const cardId = store.card?.id || ''

    return useQuery({
        queryKey: ['deal', cardId],
        queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId)
    })
}