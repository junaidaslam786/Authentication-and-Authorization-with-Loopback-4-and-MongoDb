import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Company} from '../models';
import {CompanyRepository, UserRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class CompanyService {
  constructor(
    @repository(CompanyRepository)
    public companyRepository: CompanyRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  async createCompany(company: Company): Promise<Company> {
    // @param.query.object('filter') filter?: Filter<Company>
    const {userId} = company;
    const foundUserCompany = await this.userRepository.company(userId).get();
    if (foundUserCompany?.userId !== userId) {
      const newCompany = await this.companyRepository.create(company);
      return newCompany;
      // throw new HttpErrors.UnprocessableEntity('You already have a Company');
    } else {
      throw new HttpErrors.UnprocessableEntity(
        'This Company name is already taken',
      );
    }
  }
}
