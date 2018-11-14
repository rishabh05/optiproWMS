import { OutboundModule } from './outbound.module';

describe('OutboundModule', () => {
  let outboundModule: OutboundModule;

  beforeEach(() => {
    outboundModule = new OutboundModule();
  });

  it('should create an instance', () => {
    expect(outboundModule).toBeTruthy();
  });
});
