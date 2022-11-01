let template = `
<!-- As a link -->
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
   <!--  <a class="navbar-brand" href="#">Navbar</a> router링크로 변경 -->
   <router-link class="navber-brand"
                v-bind:to="{ name : 'empSelect' }">
                사원정보목록
   </router-link>
  </div>
</nav>`

export default{
    template //template : template
}