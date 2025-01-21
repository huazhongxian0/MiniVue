const queue:Set<Function> = new Set()
let isFlushing = false
const p = Promise.resolve()
export function queueJob(job:Function){
    queue.add(job)
    if(!isFlushing){
        isFlushing = true
        p.then(() => {
            try {
                queue.forEach(job => job())
            } catch (error) {
                console.error(error);
            } finally {
                isFlushing = false
                queue.clear = 0
            }
        })
    }
}