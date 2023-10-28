import { useEffect } from 'react'
import { useTranslate } from '~/core/hooks/useTranslate/useTranslate'
import HomePage from '~/views/Home'

const EnLocale = () => {
    const {lang, setLang} = useTranslate()
    useEffect(() => {
        setTimeout(() => {
            setLang('en')
        }, 1000);
    }, [])
    return <HomePage />
}

export default EnLocale