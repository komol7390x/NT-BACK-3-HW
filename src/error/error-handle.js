export const errorHandle = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err || 'Unknown error'));
        ctx.status = error.status || 500;
        ctx.body = {
            success: false,
            status: ctx.status,
            message: error.message || 'Internal server error'
        };
        ctx.app.emit('error', error, ctx)
    }
}