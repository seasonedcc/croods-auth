import React from 'react'
import { Countdown } from 'seasoned-components'

export default ({ alert, close }) => {
  if (!alert) return null
  const { type = 'info', message } = alert
  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
      style={{ position: 'absolute', top: 10, right: 10 }}
    >
      <Countdown time={4} onFinish={close} active />
      {message}
      <button
        type="button"
        className="close"
        onClick={close}
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true" style={{ color: '#222' }}>
          &times;
        </span>
      </button>
    </div>
  )
}
