import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const savedName = ref<string>('')
  const previousNames = ref<string>(new Set<string>())

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter((name: string) => name !== savedName.value))

  /**
   * @param name - new name to set
   */

  function setNewName (name: string) {
    if (savedName.value) { previousNames.value.add(savedName.value) }

    savedName.value = name
  }

  return {
    setNewName,
    otherNames,
    savedName
  }
})

if (import.meta.hot) { import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot)) }
