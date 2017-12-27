<template>
  <div class="song-list">
      <ul>
          <li @click="selectItem(item, index)" class="item" v-for="(item, index) in songs">
              <div class="rank" v-show="rank">
                  <span :class="getIcon(index)">{{getNumber(index)}}</span>
              </div>
              <div class="content">
                  <h2 class="name">{{item.name}}</h2>
                  <p class="desc">{{getSong(item)}}</p>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
    export default {
        props: {
            songs: {
                type: Array,
                default: []
            },
            rank: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            getSong(songs) {
                return `${songs.name}.${songs.singer}`
            },
            selectItem(item, index) {
                this.$emit('select', item, index)
            },
            getNumber(index) {
                if(index>2) {
                    return index+1
                }else{
                    return ''
                }
            },
            getIcon(index) {
                if(index<=2) {
                    return `icon icon${index}`
                }else{
                    return 'text'
                }
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>