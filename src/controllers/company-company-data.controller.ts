import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Company, CompanyData} from '../models';
import {CompanyRepository} from '../repositories';
import {basicAuthorization, CompanyDataService} from '../services';
import {OPERATION_SECURITY_SPEC} from '../utils';

export class CompanyCompanyDataController {
  constructor(
    @repository(CompanyRepository)
    protected companyRepository: CompanyRepository,
    @service(CompanyDataService)
    public companyDataService: CompanyDataService,
  ) {}

  @get('/companies/{id}/{year}/{month}/company-data', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of Company has many CompanyData',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CompanyData)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'guest'],
    voters: [basicAuthorization],
  })
  async find(
    @param.path.string('id') id: string,
    @param.path.date('year') year: typeof CompanyData.prototype.year,
    @param.path.date('month') month: typeof CompanyData.prototype.month,
    @param.query.object('filter') filter?: Filter<CompanyData>,
  ): Promise<CompanyData[]> {
    return this.companyRepository.companyData(id).find(filter);
  }

  @post('/companies/{id}/{year}/{month}/company-data', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompanyData)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @param.path.string('id') id: typeof Company.prototype.id,
    @param.path.date('year') year: typeof CompanyData.prototype.year,
    @param.path.date('month') month: typeof CompanyData.prototype.month,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyData, {
            title: 'NewCompanyDataInCompany',
            exclude: ['id'],
            optional: ['companyId'],
          }),
        },
      },
    })
    companyData: Omit<CompanyData, 'id'>,
  ): Promise<CompanyData> {
    const company = await this.companyRepository
      .companyData(id)
      .create(companyData);

    company.year = new Date(year).getFullYear().toString();
    company.month = new Date(month).getMonth().toString();
    return company;
  }

  @patch('/companies/{id}/{year}/{month}/company-data', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Company.CompanyData PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'guest'],
    voters: [basicAuthorization],
  })
  async patch(
    @param.path.string('id') id: string,
    @param.path.date('year') year: typeof CompanyData.prototype.year,
    @param.path.date('month') month: typeof CompanyData.prototype.month,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyData, {partial: true}),
        },
      },
    })
    companyData: Partial<CompanyData>,
    @param.query.object('where', getWhereSchemaFor(CompanyData))
    where?: Where<CompanyData>,
  ): Promise<Count> {
    return this.companyRepository.companyData(id).patch(companyData, where);
  }

  @del('/companies/{id}/{year}/{month}/company-data', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Company.CompanyData DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'guest'],
    voters: [basicAuthorization],
  })
  async delete(
    @param.path.string('id') id: string,
    @param.path.date('year') year: typeof CompanyData.prototype.year,
    @param.path.date('month') month: typeof CompanyData.prototype.month,
    @param.query.object('where', getWhereSchemaFor(CompanyData))
    where?: Where<CompanyData>,
  ): Promise<Count> {
    return this.companyRepository.companyData(id).delete(where);
  }
}
