const systemName = process.argv[2] || 'linux'

const Service = require('node-' + systemName).Service
const { log } = require('console')

// Create a new service object
const svc = new Service({
  name:'Chevron',
  description: 'Backend server of the Chevron startpage',
  script: require('path').join(__dirname, 'server.js')
})

if (systemName === 'linux' ? svc.exists() : svc.exists) {
  log('Unregistering the service')
  svc.uninstall()
} else {
  log('Registering the service')
  svc.install()
}

svc.on('install', () => svc.start())