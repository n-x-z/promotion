import request from '@/utils/request'


// 模版列表
export function getPromotionClass(data) {
    return request({
        url: '/promotion/promotion_class',
        method: 'get', 
        data
    })
}

export function getPromotionTemplate(data) {
    return request({
        url: '/promotion/promotion_template',
        method: 'get',
        data
    })
}

// 级别下拉
export function getPromotionLevel(data) {
    return request({
        url: '/promotion/promotion_level',
        method: 'get',
        data
    })
}

// 类型
export function getPromotionType(data) {
    return request({
        url: '/promotion/promotion_type',
        method: 'get',
        data
    })
}

// 互斥组
export function getPromotionGroup(data) {
    return request({
        url: '/promotion/promotion_group',
        method: 'get',
        data
    })
}

// 
export function getPromotionResult(data) {
    return request({
        url: '/promotion/promotion_result',
        method: 'get',
        data
    })
}

// 
export function getPromotionCondition(data) {
    return request({
        url: '/promotion/promotion_condition',
        method: 'get',
        data
    })
}

// 列表查询
export function getPromotionList(data) {
    return request({
        url: '/promotion/promotion_list',
        method: 'get',
        data
    })
}

// 详情
export function getPromotionDetail(data) {
    return request({
        url: '/promotion/promotion',
        method: 'get',
        data
    })
}

// 更新状态
export function updateStatusPromotion(data) {
    return request({
        url: '/promotion/update_status?promotion_id='+data.promotion_id+'&promotion_status='+data.promotion_status,
        method: 'post',
        data
    })
}

// 提交
export function submitPromotion(data) {
    return request({
        url: '/promotion/submit',
        method: 'post',
        data
    })
}

// 删除
export function deletePromotion(data) {
    return request({
        url: '/promotion/delete',
        method: 'delete',
        data
    })
}
