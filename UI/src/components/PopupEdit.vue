<template>
    <v-dialog max-width='600px' v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn text v-on="on" left small color="grey">
                <v-icon small>edit</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-row justify="center">
                <v-card-title>
                    <h2 align>Edit your project</h2>
                </v-card-title>
            </v-row>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label='title' :value="newBody.title" v-model="title" prepend-icon='folder' :rules='inputRules'>
                    </v-text-field>
                    <v-textarea label='Information' :placeholder="newBody.content" v-model="content" prepend-icon='edit' :rules='inputRules'>
                    </v-textarea>
                    <v-menu max-width="290">
                        <template v-slot:activator="{ on }">
                            <v-text-field :placeholder="newBody.due" :value='formatedDate' v-on="on" label='Due date' prepend-icon='date_range'
                                :rules='inputRules'></v-text-field>
                        </template>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select chips :placeholder="newBody.status" :items="items" label="Status" prepend-icon='done' v-model="status"
                                :rules='inputRules'></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select chips :placeholder="newBody.person" :items="people" label="Person" prepend-icon='done' v-model="person"
                                :rules='inputRules'></v-select>
                        </v-col>
                    </v-row>
                    <v-spacer></v-spacer>
                    <v-btn text class="success mx-0 mt-3" @click="submit" :loading='loading'>Add project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import format from 'date-fns/format'
    import parseISO from 'date-fns/parseISO'

    export default {
        props: ['inputId'],
        data() {
            return {
                title: '',
                content: '',
                due: null,
                inputRules: [
                    v => v.length >= 3 || 'Minimum length is 3 characters'
                ],
                loading: false,
                dialog: false,
                items: ['ongoing', 'complete', 'overdue'],
                status: '',
                people: ['The Net Ninja', 'Ryu', 'Chun Li', 'Gouken', 'Yoshi'],
                person: '',
                id: '',
                newId: '',
                newBody: {},
            }
        },
        methods: {
            updateId: function(newId){
                this.inputId = newId;
            },
            submit() {
                if (this.$refs.form.validate()) {
                    this.loading = true;
                    const data = {
                        title: this.title,
                        content: this.content,
                        due: this.due,
                        status: this.status,
                        person: this.person
                    };
                    this.$http.put("http://localhost:3000/item/" + this.newId, data).then(() => {
                        this.loading = false;
                        this.dialog = false;
                        this.$emit('snackbarOn');
                    });

                }
            
            }
        },
        computed: {
            formatedDate() {
                return this.due ? format(parseISO(this.due), 'do MMM yyyy') : ''

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