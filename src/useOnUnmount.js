import { useEffect } from 'react'

export default (callback, condition = true) => {
  useEffect(() => (condition ? callback : () => null), [])
}
