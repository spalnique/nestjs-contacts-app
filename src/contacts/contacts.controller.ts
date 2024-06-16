import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('contacts')
export class ContactsController {
  private readonly contacts = [
    {
      _id: 1718385639086,
      name: 'test',
      email: 'test@test.com',
    },
    {
      _id: 1718385653653,
      name: 'Sasha',
      email: 'sasha@test.com',
    },
  ];
  @Post()
  createContact(@Body() body: any, @Res() res: Response): object {
    const newContact = { _id: Date.now(), ...body };
    this.contacts.push(newContact);
    if (!newContact) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong.',
        data: newContact,
      });
    }

    return res.status(201).json({
      status: 201,
      message: 'Successfully added new contact!',
      data: newContact,
    });
  }

  @Get()
  findAll() {
    return { status: 200, data: this.contacts };
  }

  @Get(':id')
  getContactById(@Param('id') id: string) {
    const parsedId = parseInt(id);
    const contact = this.contacts.find((x: any) => x._id === parsedId);
    return contact;
  }
}
