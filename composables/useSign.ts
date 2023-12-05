import { computed, reactive } from 'vue';
import { useRoute } from '#app';
import { SignService } from '~/types/SignService.types';

export const useService = () => {
    return {
        servicePurpose: computed(() => {
            const route = useRoute();

            switch (route.params.service) {
                case 'discord':
                    return 'discord_account_linking';

                default:
                    return null;
            }
        }),

        serviceName: computed(() => {
            const route = useRoute();

            return route.params.service;
        }),
    };
};

export const useSign = () => {
    return {
        service: computed(() => reactive(new SignService())),
    };
};
