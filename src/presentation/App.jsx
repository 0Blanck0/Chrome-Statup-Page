import { useContext, useEffect, useEffectEvent, useState } from 'react'
import { ColorSchemeContext, SettingsContext, ThemeContext } from './contexts/Settings'
import { useReset, useStateSelector, useUpdate } from './contexts/Store'
import { AnimatePresence, motion} from 'motion/react'
import ActiveElements from './components/ActiveElements/ActiveElements'
import QueryField from './components/QueryField/QueryField'
import Settings from './components/Settings/Settings'
import LayoutButton from './components/LayoutButton/LayoutButton'
import { BsGearFill, BsChevronRight } from 'react-icons/bs'
import { RiMenu5Fill } from 'react-icons/ri'
import { allowedModes } from './rules'
import { isMobile } from 'react-device-detect'
import classes from './App.module.css'
import './App.css'

const ignoreMobile = readFlag('ignoreMobile')

function readFlag(key) {
  try {
    return localStorage.getItem(key) !== null
  } catch {
    return false
  }
}

function App() {
  // settings
  const settings = useContext(SettingsContext)
  // theme
  const theme = useContext(ThemeContext)
  // color scheme
  const colorScheme = useContext(ColorSchemeContext)

  /* store */
  const mode = useStateSelector(state => state.mode)
  const redirected = useStateSelector(state => state.redirected)
  const timestamp = useStateSelector(state => state.timestamp)
  const updateStore = useUpdate()
  const resetStore = useReset()
  // ---

  const [showSettings, setShowSettings] = useState(false)
  const [showReset, setShowReset] = useState(false)

  function switchMacrosMenu() {
    if (mode === 'default')
      updateStore({ mode: 'opened' })
    else if (mode === 'opened')
      updateStore({ mode: 'default' })
  }

  /* handlers */
  const onKeyUp = useEffectEvent(e => {
    if (e.key === 'Shift')
      if (allowedModes.get('Chevron').has(mode))
        if (mode === 'opened')
          updateStore({ mode: 'default' })
  })
  const onKeyDown = useEffectEvent(e => {
    if (e.key === 'Shift')
        if (allowedModes.get('Chevron').has(mode))
          if (mode === 'default')
            updateStore({ mode: 'opened' })
  })
  const onContextMenu = useEffectEvent(e => {
    switchMacrosMenu()
    e.preventDefault()
  })
  // ---

  // adding event listeners
  useEffect(() => {
    const handleKeyUp = e => onKeyUp(e)
    const handleKeyDown = e => onKeyDown(e)
    const handleContextMenu = e => onContextMenu(e)

    document.addEventListener('keyup', handleKeyUp)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('contextmenu', handleContextMenu)
    return () => {
      document.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  /* setting document title */
  useEffect(() => {
    document.title = settings.general.tabTitle
  }, [settings.general.tabTitle]) 
  // ---

  /* setting theme variables */
  useEffect(() => {
    const root = document.documentElement
    for (const variable in theme)
      root.style.setProperty('--' + variable, theme[variable])
  }, [theme]) 
  // ---

  /* setting color scheme variables */
  useEffect(() => {
    document.body.setAttribute('data-color-scheme', colorScheme)
  }, [colorScheme]) 
  // ---

  /* firefox history back caching fix [#1 issue] */
  const handleVisibilityChange = useEffectEvent(() => {
    // offer to reset the page if the user went back from a redirected page
    if (document.visibilityState === 'visible' && redirected)
      setShowReset(true)
  })
  useEffect(() => {
    const onVisibilityChange = () => handleVisibilityChange()
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])
  // ---

  return (
    <div className='app'>
      {
        !isMobile || ignoreMobile
          ? <AnimatePresence>
              {
                showSettings
                  ? <Settings key='settings' onClose={() => {
                    setShowSettings(false) 
                    resetStore()}}/>
                  : 
                  <motion.div 
                    key={timestamp}
                    className={classes['container']} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={redirected || { opacity: 0 }}>
                      <ActiveElements/>
                      <QueryField/>
                      <LayoutButton
                        id='settings'
                        style={{ right: 0, top: 0 }}
                        onClick={() => setShowSettings(state => !state)}>
                          <BsGearFill/>
                      </LayoutButton>
                      <LayoutButton
                        id='macros-menu'
                        style={{ right: 0, bottom: 0 }}
                        onClick={switchMacrosMenu}>
                          {
                            mode === 'default' && <RiMenu5Fill/>
                          }
                          {
                            mode === 'opened' && <BsChevronRight/>
                          }
                      </LayoutButton>
                      {
                        showReset && <div className={classes['cancel-button']} onClick={() => location.reload()}>Cancel</div>
                      }
                  </motion.div>
              }
            </AnimatePresence>
          : <div className={classes['mobile-warning']}>
              <div>
                Mobile devices are not supported :( <br />
                <span className={classes['ignore-mobile-button']}
                onClick={() => {
                  localStorage.setItem('ignoreMobile', true)
                  location.reload()
                }}>
                  ignore this warning
                </span>
              </div>
            </div>
      }
    </div>
  )
}

export default App
