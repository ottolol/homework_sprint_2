import React, {useEffect, useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)
    const [startTimer, setStartTimer] = useState<boolean>(false)

    // Функция для добавления ведущего нуля
    const clockFunction = (num: number) => {
        return num < 10 ? "0" + num : num;
    };

    // Функция для получения текущего времени
    const getCurrentTime = () => {
        const hours = clockFunction(date.getHours());
        const minutes = clockFunction(date.getMinutes());
        const seconds = clockFunction(date.getSeconds());
        return `${hours}:${minutes}:${seconds}`;
    };

    // Функция для получения текущей даты
    const getCurrentDate = () => {
        const day = clockFunction(date.getDate());
        const month = clockFunction(date.getMonth() + 1);
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const start = () => {
        // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)
        if (timerId === undefined) { // Проверяем, что таймер еще не запущен
            const id = setInterval(() => {
                setDate(new Date()); // Обновляем состояние с текущей датой
            }, 1000);
            setTimerId(id as unknown as number); // Сохраняем ID таймера
        }
        setStartTimer(true); // Устанавливаем флаг, что таймер запущен
    }

    const stop = () => {
        // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
        if (timerId !== undefined) { // Проверяем, что таймер запущен
            clearInterval(timerId); // Очищаем интервал
            setTimerId(undefined); // Обнуляем ID таймера
        }
        setStartTimer(false); // Устанавливаем флаг, что таймер остановлен
    }

    const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка
        setShow(true)
    }
    const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
        setShow(false)
    }
    
    const stringTime = getCurrentTime() || <br/> // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
    const stringDate = getCurrentDate() || <br/> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    const stringDay = date.toLocaleDateString('en-US', { weekday: 'long' }) || <br/> // пишут студенты
    const stringMonth = date.toLocaleDateString('en-US', { month: 'long' }) || <br/> // пишут студенты

    // Очистка таймера при размонтировании компонента
    useEffect(() => {
        return () => {
            if (timerId !== undefined) {
                clearInterval(timerId);
            }
        };
    }, [timerId]);

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={startTimer} // пишут студенты // задизэйблить если таймер запущен +
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!startTimer} // пишут студенты // задизэйблить если таймер не запущен +
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
