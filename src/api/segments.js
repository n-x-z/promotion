import request from '@/utils/request'

// 增加的条件列表
export function segmentsCondition(data) {
    return request({
        url: '/segments_condition',
        method: 'get',
        data
    })
}

// 列表查询
export function getSegmentsList(data) {
    return request({
        url: '/segments/segments_list',
        method: 'get',
        data
    })
}

// 详情
export function getSegmentsDetail(data) {
    return request({
        url: '/segments/segments',
        method: 'get',
        data
    })
}

// 侧滑详情
export function getSegmentsModalDetail(data) {
    return request({
        url: '/segments/details',
        method: 'get',
        data
    })
}

// 删除
export function deleteSegments(data) {
    return request({
        url: '/segments/delete',
        method: 'delete',
        data
    })
}

// 更新状态
export function updateStatusSegments(data) {
    return request({
        url: '/segments/update_status?segment_type='+data.segment_type+'&segment_id='+data.segment_id+'&segment_status='+data.segment_status,
        method: 'post',
        data
    })
}

// 提交
export function submitSegments(data) {
    return request({
        url: '/segments/submit',
        method: 'post',
        data
    })
}
