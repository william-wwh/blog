import request from '@/request'

export function getArticleList(page){
    return request({
        method: "GET",
        url: "api/article/list/?page="+page,
    })
}
// 热门
export function getHotArticleList(){
    return request({
        method: "GET",
        url: "api/article/hot/",
    })
}
// 获取文章
export function getArticleContent(id){
    return request({
        method: "GET",
        url: "api/article/?id="+id,
    })
}
// 提交文章
export function postArticle(data){
    return request({
        method: "POST",
        url: "api/article/",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data
    })
}
// 获取评论
export function getComment(id){
    return request({
        method: "GET",
        url: "api/comment/?id="+id,
        headers: { 'content-type': 'application/x-www-form-urlencoded'},
        data:id
    })
}

// 提交评论
export function postComment(data){
    return request({
        method: "POST",
        url: "api/comment/",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data
    })
}