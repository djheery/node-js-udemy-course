# Single Thread, Event Loop & Blocking Code

NodeJS uses a single JavaScript Thread.
A thread is a process in your Operating System.

## How is it able to manage multiple requests?

Performance Question:

Working with files is often a task that takes longer.
The Event loop is automatically started by NodeJS when your program starts.
The Event loop is responsible for handling callbacks and when to execute them.
Writing to files is not managed by the Event Loop only the callback that you create for the actions to take upon successful completion.

The Event Loop only handles callbacks that contain fast operating code.
Instead the FileSystem operation and other longer operations are sent to a "Worker Pool".

The Worker pool is there to do the heavy lifting of your code, and execute long tasks.
The Worker Pool runs on different threads thus is detached from your code. This means that NodeJS is able to stay performant.
When the worker is done, it will trigger the appropriate callback.

The Event Loop

Is a loop started by NodeJS and handles any callbacks created by the developer.
It has an order that it maintains to go through callbacks.
At the beginning of each iteration:

- It checks if there are any timers to Execute when the timer completes.
- It then checks other callbacks such a I/O related callbacks.
  - These are typically file or network operations i.e blocking operations
  - If there are too many callbacks it will postpone these callbacks until the next iteration of the loop
- After this phase it enters a poll phase
  - In the Poll phase NodeJS will look for new I/O events and execute their call backs
  - Or it can defer execution of callbacks to the pending stage
  - If there are any timers to be executed it will jump back to the Timer execution phase.
- Check
  - The check section execuites setImmediate() callbacks.
- Close Callbacks
  - Now NodeJS will execute all 'close' event callbacks
- The only stage after this is process.exit() if there are no new listeners.
  - This is an event that is never finished by default.

## Security 

By Default there are no problems, but we need to be careful with how we manage global data. 