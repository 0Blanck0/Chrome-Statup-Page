import gC from '../../utils/getClasses'
import classes from './LayoutButton.module.css'

function LayoutButton({ id, style, children, onClick }) {
  if (!id) throw new Error('`id` must be defined for a LayoutButton')

  const isSettingsVisited = readVisited(id)
  function handleClick() {
    try {
      localStorage.setItem(id + 'Visited', true)
    } catch {
      /* storage unavailable: the button simply stays highlighted */
    }
    onClick()
  }

  return (
    <div
      key='icon'
      style={style}
      onClick={handleClick}
      className={gC(classes['container'], isSettingsVisited && classes['visited'])}>
      { children }
    </div>
  )
}

function readVisited(id) {
  try {
    return localStorage.getItem(id + 'Visited') !== null
  } catch {
    return false
  }
}

export default LayoutButton