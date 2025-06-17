import React from 'react'

// Иконки
const downIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
        <path d="M4 5L0.535898 0.5L7.4641 0.5L4 5Z" fill="black"/>
    </svg>
)

const upIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
        <path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill="black"/>
    </svg>
)

const noneIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
        <path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill="#ADABAC"/>
        <path d="M4 12L0.535898 7.5L7.4641 7.5L4 12Z" fill="#ADABAC"/>
    </svg>
)


// добавить в проект иконки и импортировать
// const downIcon = '[\\/]'
// const upIcon = '[/\\]'
// const noneIcon = '[--]'

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string): string => {
    // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
    // return up // исправить

    if (sort === down) return up   // если сейчас down → переключаем на up
    if (sort === up) return ''     // если сейчас up → выключаем сортировку
    return down                    // иначе ставим down
}

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
    const up = '0' + value
    const down = '1' + value

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
            style={{ cursor: 'pointer', marginLeft: '8px', display: "inline-block" }}
        >
            {/* <img
                id={id + '-icon-' + sort}
                src={icon}
                style={{ width: "16px", height: "16px", verticalAlign: "middle" }}
            /> */}
            {icon}
            
        </span>
    )
}

export default SuperSort
