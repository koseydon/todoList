<template>

  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    <v-snackbar v-model="snackbarEdited" :timeout="4000" top color='success'>
         <span>Your project has been edited</span>
         <v-btn text color='white' @click="snackbarEdited = false">Close</v-btn>
     </v-snackbar>
     <v-snackbar v-model="postDeleted" :timeout="4000" top color='error'>
         <span>Your project has been deleted</span>
         <v-btn text color='white' @click="postDeleted = false">Close</v-btn>
     </v-snackbar>
    <v-container class="my-12">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" class="ml-3" @click="sort('title')" v-on="on">
              <v-icon left small>folder</v-icon>
              <span class="caption text-lowercase">By project name</span>
            </v-btn>
          </template>
          <span>sort by project name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sort('person')" v-on="on">
              <v-icon left small>person</v-icon>
              <span class="caption text-lowercase">By Person</span>
            </v-btn>
          </template>
          <span>sort by person</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sort('due')" v-on="on">
              <v-icon left small>date_range</v-icon>
              <span class="caption text-lowercase">By Due Date</span>
            </v-btn>
          </template>
          <span>sort by due date</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sort('status')" v-on="on">
              <v-icon left small>done</v-icon>
              <span class="caption text-lowercase">By Status</span>
            </v-btn>
          </template>
          <span>sort by status</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6 xl6>
            <div class="caption grey--text">Project Title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs12 sm4 md2 xl2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2 xl2>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex  xs2 sm4 md2 xl1>
            <div class="text-right">
              <v-chip small :color="`${project.status}`" :class="`v-chip--active white--text caption my-2`">
                {{ project.status }}</v-chip>
            </div>
          </v-flex>
          <v-flex class="d-flex flex-row-reverse" xs2 sm4 md2 xl1>
            <PopupDelete @postDelete="postDeleted = true" v-bind:inputId="project._id"/>
            <PopupEdit @snackbarOn="snackbarEdited = true" v-bind:inputId="project._id"/>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import PopupEdit from '../components/PopupEdit'
import PopupDelete from '../components/PopupDelete'

  export default {
    name: 'dashboard',
    components: { PopupEdit, PopupDelete },
    data() {
      return {
        projects: [],
        snackbarEdited: false,
        postDeleted: false,
      }
    },
    methods: {
      sort(prop) {
        this.projects.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
      }
    },
    created() {
      this.$http.get('http://localhost:3000/item').then(function (data) {
        this.projects = data.body;
      })
    }
  }
</script>

<style>
  .project.complete {
    border-left: 4px solid #3CD1C2;
  }

  .project.ongoing {
    border-left: 4px solid orange
  }

  .project.overdue {
    border-left: 4px solid tomato;
  }

  .v-chip.complete {
    background: #3CD1C2;
  }

  .v-chip.ongoing {
    background: orange
  }

  .v-chip.overdue {
    background: tomato;
  }
</style>