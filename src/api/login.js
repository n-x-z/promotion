import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/promotion_login',
        method: 'post',
        data
    })
}
