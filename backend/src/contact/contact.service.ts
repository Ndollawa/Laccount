import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Contact, ActiveStatus } from '@prisma/client';
import { AuthenticatedUser, handleError } from '@app/common';
import { CreateContactDto, UpdateContactDto } from './dto';
import { ContactRepository } from './contact.repository';

@Injectable()
export class ContactService {
  constructor(protected readonly contactRepository: ContactRepository) {}

  /**
   * Find a contact by ID
   * @param id string
   * @returns Promise<Contact>
   */
  async find(id: string): Promise<Contact> {
    try {
      return await this.contactRepository.find({
        where: { id },
        // include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * Find all contacts with optional filters
   * @param query Prisma.ContactFindManyArgs
   * @returns Promise<Contact[]>
   */
  async findAll(query: any): Promise<Contact[]> {
    try {
      return await this.contactRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * Remove a contact by ID
   * @param id string
   * @returns Promise<Contact>
   */
  async remove(id: string): Promise<Contact> {
    try {
      return await this.contactRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * Create a new contact for the user
   * @param createContactData CreateContactDto
   * @param user AuthenticatedUser
   * @returns Promise<Contact>
   */
  async create(
    createContactData: CreateContactDto,
    user: AuthenticatedUser,
  ): Promise<Contact> {
    const { contactId } = createContactData;

    try {
      const existingContact = await this.contactRepository.findFirst({
        where: { userId: user.id },
      });

      if (existingContact.contacts?.includes(contactId)) {
        throw new HttpException(
          'Contact with credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }
      if (contactId === user.id)
        throw new HttpException(
          `You can't add yourself as a contact`,
          HttpStatus.NOT_ACCEPTABLE,
        );
      const contactData = existingContact
        ? {
            userId: user.id,
            contacts: [...existingContact.contacts, contactId],
          }
        : {
            userId: user.id,
            contacts: [contactId],
          };

      const newContact = await this.contactRepository.upsert({
        where: { userId: user.id },
        update: contactData,
        create: contactData,
      });

      return newContact;
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * Remove a contact by ID
   * @param userId string
   * @param contactId string
   * @returns Promise<Contact>
   */

  // Remove a contact from the contacts array
  async removeContactFromList(
    contactId: string,
    user: AuthenticatedUser,
  ): Promise<Contact> {
    try {
      const existingContact = await this.contactRepository.findFirst({
        where: { userId: user.id },
      });

      if (!existingContact || !existingContact.contacts.includes(contactId)) {
        throw new HttpException('Contact not found.', HttpStatus.NOT_FOUND);
      }

      const updatedContacts = existingContact.contacts.filter(
        (id) => id !== contactId,
      );

      return await this.contactRepository.update({
        where: { userId: user.id },
        data: { contacts: updatedContacts },
      });
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * Update a contact by ID
   * @param id string
   * @param updateContactData UpdateContactDto
   * @param user AuthenticatedUser
   * @returns Promise<Contact>
   */
  async update(
    id: string,
    updateContactData: UpdateContactDto,
    user: AuthenticatedUser,
  ) {
    try {
      return await this.contactRepository.update({
        where: { id },
        data: updateContactData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * Upsert a contact (create or update)
   * @param id string
   * @param updateContactData UpdateContactDto
   * @param user AuthenticatedUser
   * @returns Promise<Contact>
   */
  async upsert(
    id: string,
    updateContactData: UpdateContactDto,
    user: AuthenticatedUser,
  ) {
    Logger.debug(updateContactData);

    try {
      return await this.contactRepository.upsert({
        where: { id },
        data: updateContactData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
