import { Test, TestingModule } from '@nestjs/testing';
import { SupportTicketController } from '../supportTicket.controller';
import { SupportTicketService } from '../supportTicket.service';

describe('SupportTicketController', () => {
  let controller: SupportTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportTicketController],
      providers: [SupportTicketService],
    }).compile();

    controller = module.get<SupportTicketController>(SupportTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
