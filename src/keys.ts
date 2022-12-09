import {UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/context';
import {User} from './models';
import {Credentials} from './repositories';
import {CompanyService, PasswordHasher} from './services';

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER =
    BindingKey.create<PasswordHasher>('services.hasher');
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<User, Credentials>>(
    'services.user.service',
  );
}

export namespace CompanyServiceBindings {
  export const COMPANY_SERVICE = BindingKey.create<CompanyService>(
    'services.company.service',
  );
}

export namespace CompanyDataServiceBindings {
  export const COMPANY_DATA_SERVICE = BindingKey.create<CompanyService>(
    'services.company-data.service',
  );
}
