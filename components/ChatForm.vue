<template>
<v-flex xs12>
          <v-text-field
            v-model="text"
            label="tell em ur feells"
            solo-inverted
            @keydown.enter="send"
          ></v-text-field>
        </v-flex>
</template>

<script>
export default {
    data: () => ({
        text: ''
    }),
    methods: {
        send() {
            this.$socket.emit(
                "createMessage",
                {
                    text: this.text,
                    id: this.$store.state.user.id
                },
                data => {
                    if (typeof data === "string") {
                        console.error(data)
                    }else{
                        this.text = ""
                    }
                }
            )
        }
    }
}
</script>