import { Component, type ErrorInfo, type ReactNode } from 'react'
import { captureError } from '../lib/monitoring'

interface Props { children: ReactNode }
interface State { hasError: boolean }

const CHUNK_ERROR = /dynamically imported module|Loading chunk|Importing a module script failed/i

/** Catches render errors so one broken screen never leaves a blank page. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // After a new deploy, an open tab may request a JS chunk that no longer exists.
    // Reloading once fetches the fresh build instead of showing an error.
    if (CHUNK_ERROR.test(error.message) && !sessionStorage.getItem('mg-chunk-reload')) {
      sessionStorage.setItem('mg-chunk-reload', '1')
      window.location.reload()
      return
    }
    void captureError(error, { componentStack: info.componentStack })
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div role="alert" className="min-h-[100dvh] bg-black text-white flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-5xl text-[#F7FF19]">SOMETHING WENT WRONG</h1>
        <p className="text-white/60 max-w-md">
          An unexpected error occurred. Reloading usually fixes it.
        </p>
        <button className="btn-primary" onClick={() => window.location.reload()}>
          Reload page
        </button>
      </div>
    )
  }
}
