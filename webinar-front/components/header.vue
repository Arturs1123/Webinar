<template>
  <div class="headers" style="background: white;">
    <div class="header__content">
      <div class="header__logo">
        <a class="logo" href="/" style=" text-decoration: none;">
          <img src="../static/logo.png" alt="" style="width: 50px; height: 55px;">
          <span class="logo__name">NEEARBY.PRO</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header"
}
</script>

<style scoped>
.customBtn {
  padding: 10px 90px;
  border-radius: 5px;
  color: white;
  background-color: #FE6637;
}

.header__content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  min-height: 70px;
  margin: 0 auto;
}

.header__logo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo > img {
  height: 80%;
}

.header-profile-icon {
  margin-left: 50px;
  margin-right: 50px;
}

.logo__name {
  font-size: 25px;
  color: black;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  align-self: center;
  margin-left: 10px;
}
@media screen and (max-width: 470px) {
  .headers {
    display: none;
  }
}
</style>
