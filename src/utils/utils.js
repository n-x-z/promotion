export const weeks = [
    {value: '1', label: '周一'},
    {value: '2', label: '周二'},
    {value: '3', label: '周三'},
    {value: '4', label: '周四'},
    {value: '5', label: '周五'},
    {value: '6', label: '周六'},
    {value: '7', label: '周日'},
]
function getDayArray(){
	let months=[];
	for (let i = 1; i <= 30; i++) {
		months.push({value: i, label: i+ '号'})
	}
	return months;
}

export const days = getDayArray()
