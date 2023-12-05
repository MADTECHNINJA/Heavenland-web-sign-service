import { defineNuxtPlugin } from '#app';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import specific icons */
import {
    faChevronLeft,
    faChevronRight,
    faCircleCheck,
    faCircleX,
    faTriangleExclamation,
    faTimesCircle,
    faLeftLong,
    faLink,
    faCloudQuestion,
} from '@fortawesome/pro-solid-svg-icons';
import { faKey, faCheckCircle, faTimesCircle as farTimesCircle } from '@fortawesome/pro-regular-svg-icons';

export default defineNuxtPlugin((nuxtApp) => {
    library.add(
        faKey,
        faTriangleExclamation,
        faCheckCircle,
        farTimesCircle,
        faCircleX,
        faCircleCheck,
        faChevronRight,
        faChevronLeft,
        faTimesCircle,
        faLeftLong,
        faLink,
        faCloudQuestion
    );

    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
