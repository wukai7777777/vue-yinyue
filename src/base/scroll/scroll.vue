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
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            },
            isScroll: {
                type: Boolean,
                default: false
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
                console.log(this.probeType, 333)
                this.scroll = new Bscroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
                let me = this
                if(this.isScroll) {
                    this.scroll.on('scroll', (pos) => {
                        me.$emit('scroll', pos)
                    })
                }
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh()
                }, 20)
            }
        }
    }
</script>
