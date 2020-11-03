<template>
     <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img
            src="http://smart-789.image.mucang.cn/advert-image/2020/09/22/16/0b8bbf13b7144d0db1c8939d1156d59b.jpg?width=690&height=160"
            alt
          />
        </van-swipe-item>

        <van-swipe-item>
          <img
            src="http://smart-789.image.mucang.cn/advert-image/2020/10/10/09/6fc686238cd34ce0834323eb2670befd.png"
            alt
          />
        </van-swipe-item>
        
        <van-swipe-item>
          <img
            src="http://smart-789.image.mucang.cn/advert-image/2020/09/22/16/0b8bbf13b7144d0db1c8939d1156d59b.jpg?width=690&height=160"
            alt
          />
        </van-swipe-item>
      </van-swipe>
    </div>
</template>

<style lang="scss" scoped>
 .swiper {
    overflow: hidden;
    padding: 4px 10px;

    img {
      width: 100%;
      height:  100%;
      object-fit: cover;
      border-radius: 8px;
    }

    .my-swipe,
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      // line-height: 150px;
      text-align: center;
      // background-color: #39a9ed;
    }

    .van-swipe-item {
      font-size: 0;
      box-sizing: border-box;
      // background-color: pink;
      float: left;
    }
    .van-swipe__track {
      display: flex;
      height: 150px;
    }
  }
</style>