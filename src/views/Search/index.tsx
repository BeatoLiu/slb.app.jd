import { Cell, Icon, Search, Tag, Toast } from 'react-vant'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from "react";
import type { SearchInstance } from 'react-vant/es/search'

import './index.less'

const Index = () => {
	const navigate = useNavigate()
	const [kwHistory, setKwHistory] = useState<string[]>(JSON.parse(window.localStorage.kwHistory || '[]'))
	const searchRef = useRef<SearchInstance>()
	// @ts-ignore
	searchRef.current?.focus()
	// useState是异步的，所以不能在onSearch中更新localStorage
	// useEffect(()=>{
	// 	console.log(kwHistory)
	// 	window.localStorage.kwHistory = JSON.stringify(kwHistory)
	// }, [kwHistory])
	// 确认搜索
	const onSearch = (keywords: string) => {
		if (!keywords) {
			return Toast('请输入正确商品名称')
		}
		setKwHistory(params => {
			window.localStorage.kwHistory = JSON.stringify(Array.from(new Set([keywords, ...params])))
			return Array.from(new Set([keywords, ...params]))
		})
		goSearch(keywords)
	}
	// 清除历史记录
	const clearHistory = () => {
		setKwHistory([])
		window.localStorage.kwHistory = '[]'
	}
	// 点击历史记录
	const goSearch = (kw: string) => {
		navigate('/search/list', { state: { kw } })
	}
	return (
		<div className="search-kw">
			<div className="search-input">
				<Search shape="round" autofocus placeholder="输入您要搜索的产品" onSearch={onSearch} />
			</div>
			{kwHistory.length ? (
				<div className="history-list">
					<Cell
						title="历史搜索"
						extra={<Icon name="delete" className="search-icon" onClick={clearHistory} />}
					/>
					<div className="list-content">
						{kwHistory.map(item => (
							<Tag key={item} round color="#f2f2f2" text-color="#505050" onClick={() => goSearch(item)}>
								{item}
							</Tag>
						))}
					</div>
				</div>
			) : (
				''
			)}
		</div>
	)
}

export default Index
