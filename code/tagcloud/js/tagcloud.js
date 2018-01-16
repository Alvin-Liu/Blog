'use strict'

!(function(doc) {
  const cloud = doc.getElementById('tagCloud'),
    R = 250, // 半径
    _baseAngle = Math.PI / 360, // 单位角度, Math.PI / 360 * x  应该避免x是180的倍数，此时正好是半圈或者一圈 
    _screenW = doc.body.scrollWidth,
    _screenH = doc.body.scrollHeight,
    _focalLength = R * 1.5  // 球心距离屏幕的z轴距离,应该大于R

  let tags = [],
    speed = 5, // 初始速度
    angleX = speed * _baseAngle, // 绕x轴旋转角速度, 正负表示方向, 应该尽量保持角速度在[-2π, 2π] rad/单位时间, 2π 跟 4π的效果是一样的(同时转一圈和转两圈区别)
    angleY = -speed * _baseAngle

  const tag = function (ele, x, y, z) {
    this.ele = ele
    this.x = x
    this.y = y
    this.z = z
  }

  tag.prototype = {
    move: function () {
      let scale = _focalLength / (_focalLength - this.z),
        alpha = (this.z + R) / (2 * R),
        ele = this.ele
      ele.style.fontSize = 14 * scale + 'px'
      ele.style.opacity = alpha + 0.5
      ele.style.zIndex = parseInt(scale * 100)
      // 原点是 (cloud.offsetWidth/2, cloud.offsetHeight/2)
      ele.style.left = this.x + cloud.offsetWidth / 2 - ele.offsetWidth / 2 + 'px'
      ele.style.top = this.y + cloud.offsetHeight / 2 - ele.offsetHeight / 2 + 'px'
    }
  }
  const init = function () {
    const tagEle = cloud.querySelectorAll('.tag'),
      tagLen = tagEle.length
    for (let i = 0; i < tagLen; i++) {
      // 设置随机坐标，平均分布
      let a = Math.acos((2 * (i + 1) - 1) / tagLen - 1), // θ = arccos(((2*(i+1))-1)/len - 1)
        b = a * Math.sqrt(tagLen * Math.PI), // Φ = θ*sqrt(all * π)
        x = R * Math.sin(a) * Math.cos(b), // x轴坐标: x=r*sinθ*cosΦ
        y = R * Math.sin(a) * Math.sin(b), // y轴坐标: x=r*sinθ*cosΦ
        z = R * Math.cos(a), // z轴坐标: z=r*cosθ
        t = new tag(tagEle[i], x, y, z)

      tagEle[i].style.color = '#' + Math.floor(Math.random() * 0xffffff).toString(16) // 设置随机颜色
      tags.push(t)
      t.move() // 初始化位置
    }
    animate() // 旋转
  };
  /*
  绕x轴旋转
  y = ycosθ - zsinθ;
  z = ysinθ + zcosθ;
  */
  function rotateX () {
    let cos = Math.cos(angleX),
      sin = Math.sin(angleX)
    tags.forEach(function(tag) {
      let y = tag.y * cos - tag.z * sin,
        z = tag.z * cos + tag.y * sin
      tag.y = y
      tag.z = z
    })
  };
  /*
  绕y轴旋转
  x = xcosθ - zsinθ;
  z = xsinθ + zcosθ;
  */
  function rotateY () {
    let cos = Math.cos(angleY),
      sin = Math.sin(angleY);
    tags.forEach(function(tag) {
      let x = tag.x * cos - tag.z * sin,
        z = tag.z * cos + tag.x * sin
      tag.x = x
      tag.z = z
    })
  };
  // 旋转
  function animate () {
    setInterval(function () {
      rotateX()
      rotateY()
      tags.forEach(function (tag) {
        tag.move()
      })
    }, 20)
  };
  init()
  doc.addEventListener('mousemove', function (e) {
    // 横向控制 y 轴旋转，纵向控制 x 轴旋转
    angleY = 2 * (e.clientX / _screenW - 0.5) * speed * _baseAngle // 越靠近中心，速度越小，中心两侧方向相反
    angleX = 2 * (e.clientY / _screenH - 0.5) * speed * _baseAngle
  })
  var isNumber = function (n) {
    return n != '' && n != null && !isNaN(n)
  }
  doc.set.onsubmit = function (e) {
    e.preventDefault()
    const count = +this.count.value
    if (isNumber(this.speed.value)) {
      speed = +this.speed.value
      angleX = speed * _baseAngle
      angleY = -speed * _baseAngle
    }
    if (isNumber(count)) {
      var s = ''
      for (let i = 0; i < count; i++) {
        s += '<a class="tag" href="#">' + (this.txt.value || 'Alvin') + '</a>'
      }
      cloud.innerHTML = s
      init()
    }
  }
})(document)