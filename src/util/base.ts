const { LOG_LEVEL = 'standard' } = process.env

type LogLevel = 'none' | 'standard' | 'verbose'

interface IBaseOpts {
  logLevel?: LogLevel
}

/**
 * Base class with logging
 */
export class Base {
  logLevel: LogLevel = 'standard'

  constructor (opts: IBaseOpts = {}) {
    // Handle opts
    this.logLevel = opts.logLevel || (LOG_LEVEL as LogLevel)

    // Create proxy to log all method calls
    return new Proxy(this, {
      get: (_, prop: string) => {
        // @ts-expect-error: prop as string key
        if (String(prop) in this && typeof this[prop] === 'function') {
          return (...args: any[]) => {
            try {
              this.log('info', prop, args)
              // @ts-expect-error: prop as string key
              return this[prop].apply(this, args)
            } catch (e) {
              this.log('error', prop, args)
              throw e
            }
          }
        } else {
          // @ts-expect-error: prop as string key
          return this[prop]
        }
      }
    })
  }

  log (level: 'info' | 'error', prop: any, args: any[]): void {
    if (this.logLevel === 'none') return
    const argOutput =
      this.logLevel === 'verbose'
        ? args.map(a => JSON.stringify(a)).join(', ')
        : ''
    console.log(new Date(), level, this.constructor.name, prop, argOutput)
  }
}
