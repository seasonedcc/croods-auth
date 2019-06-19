import { useEffect } from 'react'

export default (callback, condition) => {
  useEffect(() => (condition ? callback : () => null), [])
}
