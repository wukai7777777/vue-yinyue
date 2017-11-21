<template>
  <div ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
    import Bscroll from 'better-scroll'

    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: {
                    type: Boolean,
                    default: true
                }
            },
            data: {
                type: Array,
                default: null
            }
        },
        mounted() {
            setTimeout(() => {
                this._initScroll()
            },20)
        },
        methods: {
            _initScroll() {
                if(!this.$refs.wrapper){
                    return
                }
                this.scroll = new Bscroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    console.log(222222)
                    this.refresh()
                }, 50)
            }
        }
    }
</script>
