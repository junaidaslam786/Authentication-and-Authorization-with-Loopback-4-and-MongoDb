import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CompanyDataRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class CompanyDataService {
  constructor(
    @repository(CompanyDataRepository)
    public companyDataRepository: CompanyDataRepository,
  ) {}

  // async addCompanyData(companyData: CompanyData) {
  //   const year = new Date(companyData.year).getFullYear().toString();
  //   const month = new Date(companyData.month).getMonth().toString();
  //   const company = await this.companyDataRepository.findOne({
  //     where: {companyData},
  //   });

  //   const newYear = (company!.year = new Date().getFullYear().toString());
  //   const newMonth = (company!.month = new Date().getMonth().toString());

  //   if (year === newYear && month === newMonth) {
  //     return this.companyDataRepository.create(companyData);
  //   }
  // }
}
