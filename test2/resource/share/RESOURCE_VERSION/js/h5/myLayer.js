;(function () {
  var t = '<span class="iconfont">&#xe610;</span>'
  var layer = window.layer
  layer.icon = {}
  layer.load = function () {
    layer.open({
      type: 2
    })
  }
  layer.msg = function (t, e) {
    return this.open({
      content: t,
      time: e ? e - 1 : 3,
      style: 'fill:#ececec',
      className: 'msg'
    })
  }
  layer.msgWarn = function (content, callback) {
    if (content) {
      return this.alert(content, callback)
    }
  }
  layer.msgTip = function (e, a) {
    return this.msg(t + e, a)
  }
  layer.msgWait = function (t, e) {
    layer.wait = layer.open({
      type: 2,
      shadeClose: 0,
      className: 'msgWait'
    })
    return layer.wait
  }
  layer.url = function (content, e) {
    return layer.open({
      className: 'layerConfirm',
      title: '温馨提示',
      content: content,
      btn: ['确定'],
      end: function () {
        typeof e === 'string' ? window.router.replace(e) : window.router.go(e)
      }
    })
  }
  layer.alert = function (content, callback) {
    layer.closeAll()
    document.onkeydown = function (event) {
      var e = event || window.event
      if (e && (e.keyCode === 32 || e.keyCode === 27)) { // 空格 esc 键就关闭
        if (!document.getElementById('layerMOkBtn')) return
        document.getElementById('layerMOkBtn').onclick()
        return false
      }
    }
    document.documentElement.style.overflow = 'hidden' // 阻止屏幕滑动穿透
    if (/ipad/.test(navigator.userAgent.toLowerCase())) {
      document.documentElement.style.position = 'fixed'
    }
    return layer.open({
      title: '温馨提示',
      shadeClose: !1,
      content: '<div class="yo-tancen"><p>' + content + '</p></div>',
      btn: ['确定'],
      yes: function (index, layero) {
        document.documentElement.style.overflow = ''
        if (/ipad/.test(navigator.userAgent.toLowerCase())) {
          document.documentElement.style.position = ''
        }
        if (callback) callback()
        layer.close(index)
      }
    })
  }
  layer.confirm = function (t, callbackA, callbackB) {
    layer.closeAll()
    document.documentElement.style.overflow = 'hidden' // 阻止屏幕滑动穿透
    if (/ipad/.test(navigator.userAgent.toLowerCase())) {
      document.documentElement.style.position = 'fixed'
    }
    return layer.open({
      className: 'layerConfirm',
      title: '温馨提示',
      shadeClose: !1,
      content: '<div class="yo-tancen"><p>' + t + '</p></div>',
      btn: ['确定', '取消'],
      yes: function (index) {
        document.documentElement.style.overflow = ''
        if (/ipad/.test(navigator.userAgent.toLowerCase())) {
          document.documentElement.style.position = ''
        }
        if (callbackA) callbackA()
        layer.close(index)
      },
      no: function (index) {
        document.documentElement.style.overflow = ''
        if (/ipad/.test(navigator.userAgent.toLowerCase())) {
          document.documentElement.style.position = ''
        }
        if (callbackB) callbackB()
        layer.close(index)
      }
    })
  }
  layer.closeAll = function () {
    for (var t = document.getElementsByClassName('layermbox'), e = 0; e < t.length; e++) {
      var a = t[e].getAttribute('index')
      a && layer.close(a)
    }
  }
  window.layer = layer
}())
