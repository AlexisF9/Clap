import {ref, watch} from 'vue'

export function useFetch(url: string) {
    const loading = ref(false)
    const data: any = ref(null)

    async function fetchData() {
        loading.value = true

        try {
            const response = await fetch(url, {
                headers: {Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}`}
            });
            data.value = await response.json();
        } catch (err: any) {
            console.log(err.toString())
        } finally {
            loading.value = false
        }
    }

    watch(() => url, fetchData, { immediate: true })

    return { data, loading }
}