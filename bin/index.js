const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const cp = require('child_process');

const scripts = require(path.resolve('./package.json')).scripts; // eslint-disable-line
const state = Object.keys(scripts).reduce((obj, key) =>
  Object.assign(obj, {
    [key]: {
      key,
      command: `npm run ${key}`,
      isRunning: false,
      stdout: '',
      stderr: '',
      exitCode: 0,
      flags: '',
      error: null,
      pid: 0,
    },
  }), {});

const app = new Koa();

app.use(serve(path.resolve(__dirname, '../public')));

const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.emit('update', state);
  socket.on('run', ({ key, flags }) => {
    if (state[key].isRunning) {
      console.log(`[WARNING]: npm run ${key} is running, ignored.`);
    }
    let args = ['run', key];
    if (flags) {
      args = args.concat(['--'].concat(flags.split(' ')));
    }
    const script = cp.spawn('npm.cmd', args, { });
    state[key].flags = flags;
    state[key].isRunning = true;
    state[key].pid = script.pid;
    script.stdout.on('data', (data) => {
      state[key].stdout += data.toString();
      socket.emit('update', state);
    });
    script.stderr.on('data', (data) => {
      state[key].stderr += data.toString();
      socket.emit('update', state);
    });
    script.on('exit', (code) => {
      state[key].exitCode = code;
      state[key].isRunning = false;
      socket.emit('update', state);
    });
    socket.emit('update', state);
  });
  socket.on('terminate', ({ key }) => {
    if (!state[key].isRunning) return;
    cp.exec(`taskkill /PID ${state[key].pid} /T /F`, (error, stdout, stderr) => {
      if (error) state[key].error = error;
      else if (stderr) state[key].stderr += stderr;
      else state[key].isRunning = false;
      socket.emit('update', state);
    });
  });
  socket.on('clear', ({ key }) => {
    state[key].stdout = '';
    state[key].stderr = '';
    socket.emit('update', state);
  });
  socket.on('disconnect', () => { });
});

server.listen(8000, () => {
  console.info('New running on localhost:8000');
});
