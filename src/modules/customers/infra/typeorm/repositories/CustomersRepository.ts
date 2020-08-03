import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      email,
    });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return this.ormRepository.findOne({
      where: {
        email,
      },
    });
  }
}

export default CustomersRepository;
