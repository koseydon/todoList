<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Projects</h1>  

  <v-container class="my-12">
  <v-expansion-panels accordion>
    <v-expansion-panel v-for="project in projects" :key="project.title">
      <v-expansion-panel-header>{{ project.title }}</v-expansion-panel-header>
      <v-expansion-panel-content class="px-8 grey--text ">
        <div class="font-weight-bold">{{ project.due }}</div>
        <div>{{ project.content }}</div>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>


export default {
  name: 'projects',
  components: {
    
  },
  data() {
    return {
      projects: []
    }
  },
  computed: {
    myProjects() {
      return this.projects.filter(project => {
        return project.person == 'The Net Ninja'
      })
    }
  },
  created() {
        this.$http.get('http://localhost:3000/item').then(function(data){
            this.projects = data.body;
        })
  }
}
</script>