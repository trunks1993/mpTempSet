import request from '@/utils/request'

// app
export function getImageDirectory() {
  return request({
    url: '/admin/template/GetImageDirectory',
    method: 'post'
  })
}