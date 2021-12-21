import { Cascader, Popup } from 'react-vant'
import React, { useEffect, useState } from 'react'
import { GetJDAreaListItem } from '@/apis/models/addressModel'
import { getJDAreaList } from '@/apis/address'

interface IProps {
	visible: boolean
	setVisible: (val: boolean) => void
	setAddress: (val: IAreaType) => void
}
interface IOpts {
	value: number
	tabIndex?: number
	selectedOptions: GetJDAreaListItem[]
}
export interface IAreaType {
	aCode: number
	aName: string
}
const ChooseArea = (props: IProps) => {
	const { visible, setVisible, setAddress } = props
	const [options, setOptions] = useState<GetJDAreaListItem[]>([])
	const fillName = { text: 'areaName', value: 'areaId' }

	useEffect(() => {
		if (!options.length && visible) {
			getJDAreaList({ type: 1 }).then(res => {
				if (res.resultCode === 1) {
					setOptions(res.data)
				}
			})
		}
	}, [visible])
	// 获取下级地址
	const getArea = (
		newOpts: GetJDAreaListItem[],
		optsObj: GetJDAreaListItem,
		{ value, tabIndex = 0, selectedOptions }: IOpts
	) => {
		getJDAreaList({ type: tabIndex + 2, pAreaId: value }).then(res => {
			if (res.resultCode === 1) {
				if (res.data.length === 0) {
					onFinish({ value, tabIndex, selectedOptions })
				} else {
					optsObj.children = res.data
					setOptions(newOpts)
				}
			}
		})
	}
	//选择地址
	const onChange = ({ value, tabIndex, selectedOptions }: IOpts) => {
		const newOpts = [...options]
		const idx0 = newOpts.findIndex(item => item.areaId === selectedOptions[0].areaId)
		if (tabIndex === 0) {
			if (!newOpts[idx0].children) {
				getArea(newOpts, newOpts[idx0], { value, tabIndex, selectedOptions })
			}
		} else if (tabIndex === 1) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const idx1 = newOpts[idx0].children.findIndex(item => item.areaId === selectedOptions[1].areaId)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (!newOpts[idx0].children[idx1].children) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				getArea(newOpts, newOpts[idx0].children[idx1], { value, tabIndex, selectedOptions })
			}
		} else if (tabIndex === 2) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const idx1 = newOpts[idx0].children.findIndex(item => item.areaId === selectedOptions[1].areaId)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const idx2 = newOpts[idx0].children[idx1].children.findIndex(item => item.areaId === selectedOptions[2].areaId)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (!newOpts[idx0].children[idx1].children[idx2].children) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				getArea(newOpts, newOpts[idx0].children[idx1].children[idx2], { value, tabIndex, selectedOptions })
			}
		} else {
			onFinish({ value, tabIndex, selectedOptions })
		}
	}
	// 选择结束
	const onFinish = ({ value, selectedOptions }: IOpts) => {
		let aNameStr = ''
		selectedOptions.forEach(item => {
			aNameStr += item.areaName
		})
		setAddress({ aName: aNameStr, aCode: value })
		setVisible(false)
	}
	return (
		<Popup round visible={visible} position="bottom" onClose={() => setVisible(false)}>
			<Cascader
				title="请选择所在地区"
				activeColor="#39b9b9"
				options={options}
				onClose={() => setVisible(false)}
				onChange={onChange}
				fieldNames={fillName}
			/>
		</Popup>
	)
}

export default ChooseArea
