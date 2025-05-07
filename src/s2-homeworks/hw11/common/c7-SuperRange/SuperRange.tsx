import React from 'react'
import {Slider, SliderProps} from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider 
            sx={{ // стили для слайдера // пишет студент
                color: '#00CC22',
                height: 4,
                '& .MuiSlider-thumb': {
                    width: 18,
                    height: 18,
                    backgroundColor: '#00CC22',
                    border: '6px solid #fff',
                    boxShadow: '0 0 0 1px #00CC22',
                    '&:hover': {
                        boxShadow: '0 0 0 2px rgba(139, 0, 255, 0.3)', // неоновый эффект при наведении
                    },
                },
                '& .MuiSlider-dragging': {
                    border: '1px solid #000',
                },
                '& .MuiSlider-track': {
                    border: '#8B8B8B',
                },
                '& .MuiSlider-rail': {
                    backgroundColor: '#8B8B8B',
                },
                '& .MuiSlider-mark': {
                    backgroundColor: '#000',
                },
                '& .MuiSlider-markActive': {
                    opacity: 0.7,
                    backgroundColor: 'inherit',
                },
            }}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange
