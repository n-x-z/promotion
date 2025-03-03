import request from '@/utils/request'

export function promotionDashboard() {
    return request({
        url: '/promotion/promotion_dashboard',
        method: 'get',
    })
}
