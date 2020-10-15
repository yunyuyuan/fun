import React, {Suspense} from 'react';
import {doMount, urlSearchMap} from "@/utils";
import './index.scss'

const types = [
    {
        folder: 'Simple sorts',
        name: '简单排序',
        js: [
            {
                name: '插入排序',
                type: 'insertion',
                component: React.lazy(()=>import('@/algorithm/sort/types/insertion'))
            },
            {
                name: '选择排序',
                type: 'selection',
                component: React.lazy(()=>import('@/algorithm/sort/types/selection'))
            }
        ]
    },
    {
        folder: 'Efficient sorts',
        name: '有效排序',
        js: [
            {
                name: '归并排序',
                type: 'merge',
                component: React.lazy(()=>import('@/algorithm/sort/types/merge'))
            },
            {
                name: '堆排序',
                type: 'heap',
                component: React.lazy(()=>import('@/algorithm/sort/types/heap'))
            },
            {
                name: '快速排序',
                type: 'quick',
                component: React.lazy(()=>import('@/algorithm/sort/types/quick'))
            }
        ]
    },
    {
        folder: 'Bubble sort and variants',
        name: '冒泡排序及变体',
        js: [
            {
                name: '冒泡排序',
                type: 'bubble',
                component: React.lazy(()=>import('@/algorithm/sort/types/bubble'))
            },
            {
                name: '联合排序',
                type: 'comb',
                component: React.lazy(()=>import('@/algorithm/sort/types/comb'))
            }
        ]
    },
    {
        folder: 'Distribution sort',
        name: '分布排序',
        js: [
            {
                name: '计数排序',
                type: 'counting',
                component: React.lazy(()=>import('@/algorithm/sort/types/counting'))
            },
            {
                name: '水桶排序',
                type: 'bucket',
                component: React.lazy(()=>import('@/algorithm/sort/types/bucket'))
            },
            {
                name: '基数排序',
                type: 'radix',
                component: React.lazy(()=>import('@/algorithm/sort/types/radix'))
            }
        ]
    },
]

const Sort = ()=>{
    const search = urlSearchMap(),
        type = search.type,
        isDetail = typeof type === 'string';
    let TheComp = null;
    if (isDetail){
        types.find(v=>v.js.find(o=> {
            if (o.type === type){
                TheComp = o.component;
                return true
            }
            return false
        }));
    }

    const toType = (type)=>{
        location.href = `${location.origin+location.pathname}?type=${type}`
    }

    return (
        <div className='algorithm-sort' flex=''>
            <div className='menu' flex=''>
                {
                    types.map(type=>{
                        return (
                            <div className='folder' key={type.folder}>
                                <span className='captain'>{type.name}</span>
                                {
                                    type.js.map(item=>{
                                        return (
                                            <div className='item' onClick={()=>{toType(item.type)}} key={item.type}>
                                                <span>{item.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className='detail'>
                <div>
                {
                    isDetail && TheComp?
                        <Suspense fallback={<div>loading</div>}>
                            <TheComp/>
                        </Suspense>
                        :
                        <b>请点击左边菜单的算法查看详情</b>
                }
                </div>
            </div>
        </div>
    )
}

doMount(<Sort/>)
