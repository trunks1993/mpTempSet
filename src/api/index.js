import request from '@/utils/request'

// app
export function getImageDirectory() {
  return request({
    url: '/admin/template/GetImageDirectory',
    method: 'get'
  })
}
export function createDir(dirName) {
  return request({
    url: '/admin/template/createDir?dirName=' + dirName,
    method: 'get'
  })
}
export function reNameDir(oldDirName, newDirName) {
  return request({
    url: '/admin/template/ReNameDir?oldDirName=' + oldDirName + '&newDirName=' + newDirName,
    method: 'get'
  })
}
export function deleteDir(dirName) {
  return request({
    url: '/admin/template/DeleteDir?dirName=' + dirName,
    method: 'get'
  })
}
export function getImages(dirName) {
  return request({
    url: '/admin/template/GetImages?dirName=' + dirName,
    method: 'get'
  })
}
export function deleteFile(fileName) {
  return request({
    url: '/admin/template/deleteFile?fileName=' + fileName,
    method: 'get'
  })
}
export function getCoupons(listQuery) {
  return request({
    url: '/Admin/TemplateVisualizationAjax/Hi_Ajax_Coupons?p=' + listQuery.current + '&title=' + listQuery.keyWord,
    method: 'get'
  })
}
export function getShopProduct(listQuery) {
  return request({
    url: '/admin/Template/GetShopProduct?page=' + listQuery.current + '&pagesize=' + listQuery.size + '&productname=' + listQuery.productName + '&ProductSaleChannel=' + listQuery.productSaleChannel + '&CategoryId=' + listQuery.categoryId,
    method: 'get'
  })
}
export function getCategory(level, key) {
  return request({
    url: '/admin/TemplatePage/getCategory?level=' + level + '&key=' + key,
    method: 'get'
  })
}
export function getFixedList(listQuery) {
  return request({
    url: '/admin/templatePage/GetFixedList?startTime=' + listQuery.startTime + '&pageSize=' + listQuery.size + '&endTime=' + listQuery.endTime + '&status=' + listQuery.status + '&pageNo=' + listQuery.current,
    method: 'get'
  })
}
export function getFixedProducts(activityId) {
  return request({
    url: '/admin/templatePage/GetFixedProducts?activeIds=' + activityId,
    method: 'get'
  })
}
export function getWpageList(listQuery) {
  return request({
    url: '/admin/templatePage/getlist?tag=' + listQuery.tag + '&rows=' + listQuery.size + '&disabled=' + listQuery.disabled + '&title=' + listQuery.title + '&page=' + listQuery.current,
    method: 'get'
  })
}
export function getGiftCardList(listQuery) {
  return request({
    url: '/admin/TemplatePage/GetGiftCardMainPageData?pageIndex=' + listQuery.current + '&pageSize=' + listQuery.size + '&GiftCardName=' + listQuery.giftCardName,
    method: 'get'
  })
}

// 保存数据
export function addTemplate(data) {
  return request({
    url: '/admin/templatePage/AddTemplate',
    method: 'post',
    data
  })
}