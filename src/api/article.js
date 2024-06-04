import request from '@/request'

export function getArticleList(page){
    return request({
        method: "GET",
        url: "/article/list/?page="+page,
    })
}
// 热门
export function getHotArticleList(){
    return request({
        method: "GET",
        url: "/article/hot/",
    })
}
// 获取文章
export function getArticleContent(id){
    return request({
        method: "GET",
        url: "/article/?id="+id,
    })
}
// 提交文章
export function postArticle(data){
    return request({
        method: "POST",
        url: "/article/",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data
    })
}