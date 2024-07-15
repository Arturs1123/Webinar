module.exports.create = (name, options = {}) => {
    const time = options.time ? options.time : () => new Date().toISOString()
    const stringifySpace = process.env.NODE_ENV === 'development' ? 2 : null

    const createLogger = (context = {}) => {
        const template = Object.create(null)
        template.level = undefined
        template.time = undefined
        template.name = undefined
        template.module = undefined
        template.context = undefined
        template.msg = undefined
        const render = Object.assign(template, context)

        render.toJSON = function () {
            if (this.msg instanceof Object) {
                if (this.msg instanceof Error) {
                    this.msg = this.msg.stack
                    return this
                }

                for (const key in this.msg) {
                    if (this.msg[key] instanceof Error) {
                        this.msg[key] = this.msg[key].stack
                    }
                }
            }

            return this
        }

        return new Proxy(console, {
            get (target, prop, receiver) {
                if (prop in target) {
                    if (typeof target[prop] === 'function') {
                        return (message) => {
                            render.level = prop
                            render.time = time()
                            render.msg = message

                            target[prop](JSON.stringify(render, null, stringifySpace))
                        }
                    } else {
                        return Reflect.get(target, prop, receiver)
                    }
                } else {
                    if (prop === 'child') {
                        return (childContext) => {
                            return createLogger(Object.assign(context, childContext))
                        }
                    }

                    if (prop === 'addContext') {
                        return (context) => {
                            if (!(context instanceof Object)) {
                                throw new Error('Context must be an object')
                            }

                            if (!render.context) {
                                render.context = {}
                            }

                            render.context = Object.assign(render.context, context)
                        }
                    }

                    if (prop === 'cleanContext') {
                        return () => {
                            render.context = undefined
                        }
                    }
                }
            }
        })
    }

    return createLogger({ name })
}
