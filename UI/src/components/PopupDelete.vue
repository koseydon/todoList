<template>
    <v-dialog max-width='350px' v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn text v-on="on" left small color="grey">
                <v-icon small>delete</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-row justify="center">
                <v-card-title>
                    <h3>Are you sure to Delete</h3>
                </v-card-title>
            </v-row>
            <v-row justify="center">
                <v-card-title>
                    <h3>{{ this.newBody.title }}</h3>
                </v-card-title>
            </v-row>
            <v-row justify="center">
                <v-btn @click="deletePost" :loading='loading' class="ma-5">
                    <v-icon small>done</v-icon>
                </v-btn>
                <v-btn class="ma-5" @click="dialog = false">
                    <v-icon small>clear</v-icon>
                </v-btn>
            </v-row>

        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['inputId'],
        data() {
            return {
                newBody: [],
                loading: false,
                dialog: false,
                newId: '',
            }
        },
        methods: {
            updateId: function (newId) {
                this.inputId = newId;
            },
            deletePost() {
                this.$http.delete("http://localhost:3000/item/" + this.newId).then(() => {
                    this.loading = false;
                    this.dialog = false;
                    this.$emit('postDelete')
                });
            }
        },
        created() {
            this.newId = this.inputId;
            this.$http.get('http://localhost:3000/single-item/' + this.newId).then(function (data) {
                this.newBody = data.body;
            })
        }
    }
</script>