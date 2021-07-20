$(function () {
  let banner = $('#bannerAni')
  if (banner.length) {
    const canvas = document.querySelector('#bannerAni')
    const ctx = canvas.getContext('2d')

    const border = {
      top: 0,
      left: 0,
      right: $('.index-banner, .page-banner').width(),
      bottom: $('.index-banner, .page-banner').height(),
    }
    canvas.width = $('.index-banner, .page-banner').width()
    canvas.height = $('.index-banner, .page-banner').height()

    let blocks = []

    let blockNumber = Math.random() * 30 + 5

    // 生成n个不同形状和颜色的方块
    for (let i = 0; i < blockNumber; i++) {
      let size = Math.random() * 10 // 大小
      let alpha = Math.random() + 0.1
      let color = `rgba(255, 255, 255, ${alpha})` // 颜色
      block = new Block(size, color)
      block.id = `block_${i}`
      block.x = Math.random() * border.right
      block.y = Math.random() * 10 + border.bottom
      block.vx = Math.random()
      block.vy = Math.random() * Math.random()
      blocks.push(block)
    }

    // 绘制图形
    function drawBlock(block, pos) {
      block.y -= block.vy

      // 边界循环
      if (block.y < border.top + block.length) {
        block.y = Math.random() * 10 + border.bottom
        block.x = Math.random() * border.right
      }

      block.draw(ctx)
    }

    function drawFrame() {
      clear()
      raf = window.requestAnimationFrame(drawFrame)
      let i = blocks.length
      while (i--) {
        drawBlock(blocks[i], i)
      }
    }

    // 清除画布
    function clear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = canvas.width
      canvas.height = canvas.height
    }

    drawFrame()
  }
})

// 定义一个块的类
class Block {
  constructor(length = 5, color = 'blue') {
    this.x = 100
    this.y = 100
    this.vx = 5
    this.vy = 2
    this.ax = 0
    this.ay = 0
    this.scale = 1
    this.length = length
    this.color = color
    this.id = ''
    this.angle = 0
    this.opacity = 1
  }
  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.length, this.length)
    ctx.shadowColor = this.color
    ctx.shadowBlur = 3
    ctx.restore()
  }
  getBounds() {
    return {
      left: this.x,
      top: this.y,
      right: this.x + this.length,
      bottom: this.y + this.length,
    }
  }
}
