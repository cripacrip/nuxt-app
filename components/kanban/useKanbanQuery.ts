import { useQuery } from "@tanstack/vue-query";
import { KANBAN_DATA } from "./kanban.data";

import type { IDeal } from "~/types/deals.types";
import type { IColumn } from "./kanban.types";

export function useKanbanQuery() {
    return useQuery({
        queryKey: ['deals', { board: 'kanban'}],
        queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
        select(data) {
            // const newBoard = [...KANBAN_DATA]

            const newBoard: IColumn[] = KANBAN_DATA.map(column => ({
                ...column,
                items: [],
            }))
            const deals = data.documents as unknown as IDeal[]

            for (const deal of deals) {
                const column = newBoard.find(col => col.id === deal.status)
                if (column) {
                    column.items.push({
                        $createdAt: deal.$createdAt,
                        id: deal.$id,
                        name: deal.name,
                        price: deal.price,
                        companyName: deal.customer.name,
                        status: column.name
                    })
                }
            }

            return newBoard
        },
    })
}