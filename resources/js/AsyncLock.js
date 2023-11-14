class AsyncLock {
    constructor () {
      this.disable = () => {}
      this.promise = Promise.resolve()
    }
  
    enable () {
      this.promise = new Promise(resolve => this.disable = resolve)
    }
  }
  
//   /*
//     EXAMPLE USAGE:
//   */
  
//   // Create a new lock
//   const lock = new AsyncLock()
  
//   // Enable it
//   lock.enable()
  
//   // Make an async function that...
//   async function test () {
//     // Waits for the lock to be disabled
//     await lock.promise
  
//     // Then writes to STDOUT
//     console.log('Test')
//   }
export default AsyncLock;