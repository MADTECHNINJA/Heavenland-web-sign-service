import { useRoute } from '#app';
import { computed } from 'vue';

export default () => {
    const route = useRoute();

    return {
        getParam: computed(() => {
            return (param: string) =>
                Array.isArray(route.query?.[param]) ? route.query?.[param][0] : (route.query?.[param] as string);
        }),
    };
};
