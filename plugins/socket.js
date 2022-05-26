import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function({store}) {
    Vue.use(new VueSocketIO({
    debug: false,
    connection: 'https://jolly-parfait-98b469.netlify.app:3000',
    // 'http://localhost:3000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
})
)
}