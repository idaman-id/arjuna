
const chai = require('chai'), expect = chai.expect;
chai.use(require('chai-like'));
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));

const { subscriber } = require('../../../.utility/messaging');
const EventClientRabbit = require('../../../network/event-client-rabbit');
const Event = require('../../../network/event');

describe('event subscribe method', function() {
  
  let event = null;
  let eventClient = null;
  let connection = null;

  before(function() {
    
  });

  after(function() {
    
  });

  beforeEach(function() {
    event = Event;
    connection = subscriber;
    eventClient = new EventClientRabbit({
      connection: connection
    });
  });

  afterEach(async function() {
    
  });

  it('should fail when params is not passed', async function() {
    await expect(

      event.subscribe()

    ).to.be.rejectedWith(Error);
  });
  it('should fail when params.client is not valid', async function() {
    await expect(

      event.subscribe({
        client: 'invalid_client'
      })

    ).to.be.rejectedWith(Error);
  });
  it('should fail when params.exchange_name is not valid', async function() {
    await expect(

      event.subscribe({
        exchange_name: {}
      })

    ).to.be.rejectedWith(Error);
  });
  it('should fail when params.callback is not valid', async function() {
    await expect(

      event.subscribe({
        callback: ''
      })

    ).to.be.rejectedWith(Error);
  });

  it('should success when callback is passed', async function() {
    const result = await event.subscribe({ 
      client: eventClient,
      exchange_name: 'test_buffer_data',
      callback: function(response) {
        console.log("response", response);
      }
    });

    expect(result).to.be.an('undefined');
  });
  
  it('should success when using proto buffer data', async function() {
    const result = await event.subscribe({ 
      client: eventClient,
      exchange_name: 'test_proto_data',
      proto: {
        name: 'assets/protobuf/user.proto',
        package: 'user.User',
      },
      callback: function(response) {
        console.log("response", response);
      },
    });

    expect(result).to.be.an('undefined');
  });

});