import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {
  private readonly contacts = [
    {
      id: 1718385639086,
      name: 'test',
      email: 'test@test.com',
    },
    {
      id: 1718385653653,
      name: 'Sasha',
      email: 'sasha@test.com',
    },
  ];
  @Post()
  createContact(@Body() body: any): object {
    const newContact = { id: Date.now(), ...body };
    this.contacts.push(newContact);
    return {
      status: 201,
      message: 'Successfully added new contact!',
      data: newContact,
    };
  }

  @Get()
  findAll() {
    return { status: 200, data: this.contacts };
  }

  @Get(':id')
  getContactById(@Param() params: any) {
    const parsedId = parseInt(params.id);
    const contact = this.contacts.find((x: any) => x.id === parsedId);
    return contact;
  }
}
