import moment from 'moment'

// 当前unix时间戳
export function nowUnixTs () {
  return Date.parse(new Date()) / 1000
}

export function beautyTime (_time) {
  let time = 'n/a'
  const CURRENT_YEAR = 2019
  if (_time) {
    if (moment(_time * 1000).get('year') === CURRENT_YEAR) {
      time = moment(_time * 1000).format('MM/DD')
    } else {
      time = moment(_time * 1000).format('YYYY/MM/DD')
    }
  }
  return time
}
export function getHost (url) {
  if (!url) return ''
  const domain = url.split('/')
  if (domain[2]) {
    return domain[2]
  }
  return ''
}

export function setCookie (name, value, days = 1) {
  let d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
}

export function getCookie (name) {
  let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}

export function delCookie (name) {
  setCookie(name, '', -1)
}

export const isNDaysAgo = (n, time) => {
  const nowTime = moment()
    .subtract(n, 'days')
    .format('YYYY-MM-DD')
  const timeFormat = moment(time).format('YYYY-MM-DD')
  return moment(nowTime).isAfter(timeFormat)
}
