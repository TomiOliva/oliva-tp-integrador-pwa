export function Toast({ notification, onClose }) {
  if (!notification) {
    return null
  }

  return (
    <div
      className={`toast toast--${notification.type}`}
      role="status"
      aria-live="polite"
    >
      <span>{notification.message}</span>
      <button
        className="toast__close"
        type="button"
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        ×
      </button>
    </div>
  )
}
