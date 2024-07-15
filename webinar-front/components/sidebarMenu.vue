<!--<template>-->
<!--  <div class="sidebar__content">-->
<!--    sidebar-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--  name: "Sidebar"-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.sidebar__content {-->
<!--  background: white;-->
<!--  display: flex;-->
<!--  flex-direction: row;-->
<!--  //flex-grow: 1;-->
<!--  width: 20%;-->
<!--  min-width: 20%;-->
<!--  min-height: 100%;-->
<!--  padding: 1rem;-->
<!--  border: solid #656565 1px;-->
<!--}-->
<!--</style>-->

<template>
  <div class="sidebar-wrapper">
    <div class="sidebar-buttons">

      <a href="">
        <img src="../static/svg/mypage.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Моя страница</p>
      </a>
      <a href="">
        <img src="../static/svg/news.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Новости</p>
      </a>
      <a href="">
        <img src="../static/svg//messages.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Сообщения</p>
      </a>
      <a href="">
        <img src="../static/svg/posts.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Посты</p>
      </a>
      <a href="">
        <img src="../static/svg/orders.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Заказы</p>
      </a>
      <a href="">
        <img src="../static/svg/orders.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Товары</p>
      </a>
      <a href="">
        <img src="../static/svg/products.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Подписки</p>
      </a>
      <a href="">
        <img src="../static/svg/subscriptions-menu-icon.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Быстрый сайт</p>
      </a>
      <a href="/webinar-autowebinar">
        <img src="../static/svg/fast-website.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Вебинар|Автовебинар</p>
      </a>
      <a href="">
        <img src="../static/svg/smart-links.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Умные ссылки</p>
      </a>
      <a href="">
        <img src="../static/svg/partners.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Партнерка</p>
      </a>
      <a href="">
        <img src="../static/svg/advertisments.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Реклама</p>
      </a>
      <a href="">
        <img src="../static/svg/favourites.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Избранное</p>
      </a>
      <a href="">
        <img src="../static/svg/awards.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Награды</p>
      </a>
      <a href="">
        <img src="../static/svg/charity.svg" alt="">
        <p style="margin-bottom: 0;" class="name__menu">Благотворительность</p>
      </a>
    </div>
  </div>
</template>

<script>



export default {
  name: 'SidebarMenu'
}

</script>

<style>
.sidebar-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 25px;
}
.sidebar-buttons > a {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 20px;
}
.name__menu {
  margin-bottom: 0;
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-left: 15px;
}
</style>

