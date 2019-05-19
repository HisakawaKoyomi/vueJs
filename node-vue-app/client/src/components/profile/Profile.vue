<template>
  <div>
    <div class="row">
      <div class="col-6">
        <a class="btn btn-light mb-3 float-left"
           @click.prevent="$router.go(-1)">返回个人信息</a>
      </div>
    </div>

    <ProfileHeader v-if="profile" :profile="profile"></ProfileHeader>
    <ProfileAbout v-if="profile" :profile="profile"></ProfileAbout>
    <ProfileCreds v-if="profile && (profile.experience || profile.education)"
                  :experience="profile.experience" :education="profile.education"></ProfileCreds>
  </div>
</template>

<script>
  import ProfileHeader from "./ProfileHeader"
  import ProfileAbout from "./ProfileAbout"
  import ProfileCreds from "./ProfileCreds"

    export default {
      name: "Profile",
      data() {
        return {
          profile: null
        }
      },
      components: {
        ProfileHeader,
        ProfileAbout,
        ProfileCreds,
      },
      beforeRouteEnter(to,from,next) {
        next(vm => {
          vm.getProfileByHandle(to.params.handle);
        })
      },
      methods: {
        getProfileByHandle(handle) {
          this.$axios.get(`/api/profile/handle/${handle}`)
            .then(res => {
              console.log(res.data);
              this.profile = res.data;
            }).catch(err => {
              console.log(err.response);
              this.profile = null;
          })
        }
      }
    }
</script>

<style scoped>

</style>
