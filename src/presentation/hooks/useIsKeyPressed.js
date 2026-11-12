import { useEffect, useState } from 'react'

function useIsKeyPressed(keyName) {
  const [isKeyPressed, setIsKeyPressed] = useState(false)

  useEffect(() => {
    const onKeyDown = e => e.key === keyName && setIsKeyPressed(true)
    const onKeyUp = e => e.key === keyName && setIsKeyPressed(false)
    // the keyup event is lost when the window loses focus (e.g. Alt+Tab)
    const onBlur = () => setIsKeyPressed(false)

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [keyName])

  return isKeyPressed
}

export default useIsKeyPressed
