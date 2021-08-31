import { useState } from 'react'

export const useModal = () => {
    const [isVisible, setIsVisible] = useState(false)
    return {
        isVisible,
        show: () => setIsVisible(true),
        hide: () => setIsVisible(false),
    }
}
