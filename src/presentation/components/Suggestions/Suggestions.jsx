import { useEffect, useRef } from 'react'
import gC from '../../utils/getClasses'
import classes from './Suggestions.module.css'

function Suggestions({ suggestions, selectedSuggestion, queryMode, buttonMode, onRedirect, setSelected }) {
  return (
    <div 
      className={gC(classes['container'], classes[queryMode])}>
      { suggestions.map((suggestion, index) => 
        <Suggestion 
          key={suggestion.suggestion + index} 
          suggestion={suggestion}
          selected={suggestion === selectedSuggestion}
          queryMode={queryMode}
          buttonMode={buttonMode}
          onClick={onRedirect} 
          setSelected={setSelected}/>) 
      }
    </div>
  )
}

function Suggestion({ suggestion, selected, queryMode, buttonMode, onClick, setSelected }) {
  const ref = useRef(null)
  const mouseMoved = useRef(false)

  // keep the keyboard-selected suggestion visible
  useEffect(() => {
    if (selected) ref.current?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  function handleMouseMove() {
    mouseMoved.current = true
    // select only if it wasn't selected before
    if (!selected) setSelected(suggestion)
  }

  function handleMouseLeave() {
    // only if mouse moved (to prevent non-user triggers)
    if (mouseMoved.current) setSelected(null)
  }

  const commonProps = {
    ref,
    className: gC(
      classes['suggestion'],
      classes[suggestion.source + '-source'],
      classes[buttonMode],
      selected && classes['selected']),
    onClick
  }

  switch (queryMode) {
    case 'default': return (
      <div
        {...commonProps}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}>
          <div>{suggestion.suggestion}</div>
      </div>
    )
    default: throw new Error('unknown queryMode: ' + queryMode)
  }
}

export default Suggestions