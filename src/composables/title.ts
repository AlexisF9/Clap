import { onUnmounted } from "vue";

export function useTitle(title: string) {
    document.title = title;

    onUnmounted(() => {
        document.title = 'cc'
    })
}