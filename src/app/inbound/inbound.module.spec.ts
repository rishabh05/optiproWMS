import { InboundModule } from './inbound.module';

describe('InboundModule', () => {
  let inboundModule: InboundModule;

  beforeEach(() => {
    inboundModule = new InboundModule();
  });

  it('should create an instance', () => {
    expect(inboundModule).toBeTruthy();
  });
});
