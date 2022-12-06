require('dotenv').config();
var cp = require("child_process");
var osu = require('node-os-utils')
const si = require('systeminformation');

const cors = require('@fastify/cors');
// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

fastify.register(cors, {
    // put your options here
    origin: true
})

// Declare a route
fastify.get('/', async (request, reply) => {
    return {
        connected: true
    }
});

fastify.get('/system', async (request, reply) => {
    const [cpuUsage, memUsage, timeOpen] = await Promise.all([osu.cpu.usage(), osu.mem.free(), osu.os.uptime()]);
    return {
        cpuUsage,
        memUsage: Math.round(memUsage.freeMemMb / memUsage.totalMemMb * 10000) / 100,
        timeOpen
    }
});

fastify.get('/restart', async (request, reply) => {
    cp.exec("shutdown /r")
    return true;
});

fastify.get('/sleep', async (request, reply) => {
    cp.exec("rundll32.exe powrprof.dll,SetSuspendState 0,1,0")
    return true;
});

fastify.get('/shutdown', async (request, reply) => {
    cp.exec("shutdown -s")
    return true;
});

fastify.get('/app/:id', async (request, reply) => {
    var CMD = require('./cmd.json')
    const command = CMD[request.params.id.toUpperCase()];
    if (command) {
        cp.exec(command);
        return true;
    }
    
    return false;
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen({
            host: '0.0.0.0',
            port: process.env.PORT
        });
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()