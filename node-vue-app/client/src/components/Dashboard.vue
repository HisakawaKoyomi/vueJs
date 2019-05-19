<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4">Dashboard</h1>
          <p v-if="user != null" class="lead text-muted">
            Welcome
            <router-link v-if="profile == null" to="/profiles">{{user.name}}</router-link>
            <router-link v-else :to="`/profile/${profile.handle}`">{{user.name}}</router-link>
          </p>
          <div v-if="profile != null">
            <!--操作按钮-->
            <ProfileActived></ProfileActived>
            <!--展示个人经历及教育经历-->
            <Experience :experience="profile.experience" @deleteExperience="deleteExperience"></Experience>
            <Education :education="profile.education" @deleteEducation="deleteEducation"></Education>
            <!--删除用户及个人信息按钮-->
            <div style="margin-bottom: 60px">
              <button class="btn btn-danger" @click="deleteClick">删除当前账户</button>
            </div>
          </div>
          <div v-else>
            <p>没有任何相关的个人信息，请添加您的个人信息</p>
            <router-link to="/create-profile" class="btn btn-lg btn-info">添加个人信息</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileActived from "./common/ProfileActived"
  import Experience from "./common/Experience"
  import Education from "./common/Education"

    export default {
      name: "Dashboard",
      data() {
        return {
          profile: null
        }
      },
      computed: {
        user() {
          return this.$store.getters.user;
        }
      },
      components: {
        ProfileActived,
        Experience,
        Education
      },
      created() {
        //this.getProfileData();

      },
      beforeRouteEnter(to,from,next) {
        next(vm => {
          vm.getProfileData();
        })
      },
      methods: {
        getProfileData() {
          this.$axios.get("/api/profile")
            .then(res => {
                this.profile = res.data;
                this.$store.dispatch("setProfile",this.profile);
            }).catch(err => {
              this.$store.dispatch("setProfile",this.profile);
              console.log(err.response);
          })
        },
        deleteClick() {
          this.$axios.delete("/api/profile")
            .then(res => {
              this.profile = null;
              localStorage.removeItem("jwtToken");
              this.$store.dispatch("clearCurrentState");
              this.$router.push("/login");
            }).catch(err => {
              console.log(err);
          })
        },
        deleteExperience(id) {
          console.log(2);
          this.$axios.delete(`/api/profile/experience/${id}`)
            .then(res => {
              this.profile = res.data;
            }).catch(err => {
              console.log(err.response);
          })
        },
        deleteEducation(id) {
          this.$axios.delete(`/api/profile/education/${id}`)
            .then(res => {
              this.profile = res.data;
            }).catch(err => {
              console.log(err.response);
          })
        }
      }
    }
</script>

<style scoped>

</style>
