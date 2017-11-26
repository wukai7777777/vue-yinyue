<template>
  <div class="song-list">
      <ul>
          <li class="item" v-for="item in songs">
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
            }
        },
        methods: {
            getSong(songs) {
                return `${songs.name}.${songs.singer}`
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