import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { removeCookies } from "@/modules/cookies"
import { User } from "@/types/auth"

type UserStoreProps = {
	user: User | null
	setUser: (pendaftar: User | null) => void
	logout: () => void
}

export const useUserStore = create<UserStoreProps>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user: User | null) => set({ user }),
			logout: () => { 
                removeCookies("renimo_token")
                set({ user: null })
            }
		}),
		{
			name: "user",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
)

