<template>
  <v-flex xs12>
    <v-text-field
      v-model="text"
      label="введите сообщение"
      solo-inverted
      @keydown.enter="send"
    ></v-text-field>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    text: "",
  }),
  watch: {},
  methods: {
    send() {
      this.$socket.emit(
        "createMessage",
        {
          text: this.text,
          id: this.$store.state.user.id,
        },
        (data) => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            this.text = "";
          }
        }
      );
    },
  },
};
</script>