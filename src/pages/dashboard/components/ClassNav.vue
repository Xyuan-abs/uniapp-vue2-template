<!-- 
  名称：ClassNav
  版本：1.0.0 
  作者：Xyuan
  时间：2022年1月6日11:54:33
 -->
<template>
  <view class="class-nav">
    <u-scroll-list @right="right" @left="left">
      <view class="scroll-list">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="scroll-list__goods-item"
          :class="[index === 9 && 'scroll-list__goods-item--no-margin-right']"
          @click="toDetail"
        >
          <image class="scroll-list__goods-item__image" :src="item.thumb"></image>
          <text class="scroll-list__goods-item__text">￥{{ item.price }}</text>
        </view>
        <view class="scroll-list__show-more">
          <text class="scroll-list__show-more__text" @click="showMore">查看更多</text>
          <u-icon name="arrow-leftward" color="#f56c6c" size="12"></u-icon>
        </view>
      </view>
    </u-scroll-list>
  </view>
</template>

<script>
export default {
  name: 'ClassNav',
  components: {},
  props: {},
  data() {
    return {
      list: [
        {
          price: '230.5',
          thumb: 'https://cdn.uviewui.com/uview/goods/1.jpg',
        },
        {
          price: '74.1',
          thumb: 'https://cdn.uviewui.com/uview/goods/2.jpg',
        },
        {
          price: '8457',
          thumb: 'https://cdn.uviewui.com/uview/goods/6.jpg',
        },
        {
          price: '1442',
          thumb: 'https://cdn.uviewui.com/uview/goods/5.jpg',
        },
        {
          price: '541',
          thumb: 'https://cdn.uviewui.com/uview/goods/2.jpg',
        },
        {
          price: '234',
          thumb: 'https://cdn.uviewui.com/uview/goods/3.jpg',
        },
        {
          price: '562',
          thumb: 'https://cdn.uviewui.com/uview/goods/4.jpg',
        },
        {
          price: '251.5',
          thumb: 'https://cdn.uviewui.com/uview/goods/1.jpg',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  onLoad() {}, // 页面
  mounted() {}, // 组件
  methods: {
    left() {
      console.log('left')
    },
    right() {
      console.log('right')
    },
    showMore() {
      console.log('showMore')
    },
    toDetail(name) {
      uni.navigateTo({
        url: '/pages/detail/index',
      })
    },
  },
}
</script>

<style lang="scss">
.class-nav {
  font-family: inherit;
  background-color: #fff;
  border-radius: 4px;
  padding: 15px;
  .scroll-list {
    @include flex(row);

    &__goods-item {
      margin-right: 20px;

      &__image {
        width: 60px;
        height: 60px;
        border-radius: 4px;
      }

      &__text {
        color: #f56c6c;
        text-align: center;
        font-size: 12px;
        margin-top: 5px;
      }
    }

    &__show-more {
      background-color: #fff0f0;
      border-radius: 3px;
      padding: 3px 6px;
      @include flex(column);
      align-items: center;

      &__text {
        font-size: 12px;
        width: 12px;
        color: #f56c6c;
        line-height: 16px;
      }
    }
  }
}
</style>
