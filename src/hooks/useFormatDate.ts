const useFormatDate = () => {
	/**
	 * @description 將時間格式改為“9/25”
	 * @param date
	 */
	const formatDayMonth = (date: Date) => {
		return `${date.getMonth() + 1}/${date.getDate()}`
	}
	/**
	 * @description 当选完时间后，对时间进行格式化
	 * @param start 开始时间
	 * @param end 结束时间
	 * @param isNeedH 是否需要时分秒，默认不需要
	 * @return startTime 开始时间
	 * @return endTime 结束时间
	 * @return timeStr 字符串
	 */
	const getFormatTime = (start: Date, end: Date,isNeedH = false) => {
		const timeStr = `${formatDayMonth(start)} - ${formatDayMonth(end)}`
		const startTime = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + (isNeedH ? ' 00:00:00' : '')
		const endTime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + (isNeedH ? ' 23:59:59' : '')
		return { startTime, endTime, timeStr }
	}
	/**
	 * @description 获取指定日期间隔的起止时间，以及拼成的字符串
	 * @param day 天数
	 * @param isNeedH 是否需要时分秒，默认不需要
	 * @return startTime 开始时间
	 * @return endTime 结束时间
	 * @return timeStr 字符串
	 */
	const getTimeParams = (day: number, isNeedH = false) => {
		const end = new Date()
		const start = new Date()
		start.setTime(start.getTime() - 3600 * 1000 * 24 * day)
		return getFormatTime(start,end,isNeedH)
	}

	return { formatDayMonth, getTimeParams, getFormatTime }
}
export default useFormatDate
